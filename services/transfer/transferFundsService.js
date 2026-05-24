const mongoose = require("mongoose");
const Account = require("../../models/Account");
const Transaction = require("../../models/TransactionHistory");
const sendEmail = require("../notification/sendMail");
const transferService = require("../account/transfer"); // external API logic

exports.transferFundsService = async ({ senderAccount, receiverAccount, amount }) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const sender = await Account.findOne({ accountNumber: senderAccount }).populate("user").session(session);
        const receiver = await Account.findOne({ accountNumber: receiverAccount }).populate("user").session(session);

        if (!sender) throw new Error("Sender account not found");
        if (!receiver) throw new Error("Receiver account not found");

        if (senderAccount === receiverAccount) throw new Error("Cannot transfer to same account");

        if (sender.balance < amount) throw new Error("Insufficient balance");

        const response = await transferService({
            from: senderAccount,
            to: receiverAccount,
            amount
        });

        if (response.status !== "SUCCESS") {
            throw new Error("Transfer failed");
        }

        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ session });
        await receiver.save({ session });

        const transaction = await Transaction.create([{
            senderAccount,
            receiverAccount,
            amount,
            reference: response.reference,
            status: response.status
        }], { session });

        await session.commitTransaction();
        session.endSession();

        // emails AFTER DB commit
        await Promise.all([
            sendEmail({
                to: sender.user.email,
                subject: `Debit Alert - ₦${amount}`,
                customerName: sender.accountName,
                type: "debit",
                message: `
Debit Amount: ₦${amount}
Recipient: ${receiver.accountName}
Account Number: ${receiver.accountNumber}
Reference: ${response.reference}

Your current balance is ₦${sender.balance}
        `
            }),

            sendEmail({
                to: receiver.user.email,
                subject: `Credit Alert - ₦${amount}`,
                customerName: receiver.accountName,
                type: "credit",
                message: `
Credit Amount: ₦${amount}
Sender: ${sender.accountName}
Account Number: ${sender.accountNumber}
Reference: ${response.reference}

Your current balance is ₦${receiver.balance}
        `
            })
        ]);

        return {
            success: true,
            message: "Transfer successful",
            data: {
                response,
                transaction: transaction[0]
            }
        };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};