const mongoose = require("mongoose");
const Account = require("../../models/Account");
const Transaction = require("../../models/TransactionHistory");
const sendEmail = require("../notification/sendMail");
const transferService = require("./transfer");



exports.transferFundsService = async ({
  senderAccount,
   receiverAccount,
    amount
}) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Get accounts
        const sender = await Account.findOne({
            accountNumber: senderAccount
        }).populate("user").session(session);

        const receiver = await Account.findOne({
            accountNumber: receiverAccount
        }).populate("user").session(session);
        console.log("SENDER FULL OBJECT:", JSON.stringify(sender || {}, null, 2));
        console.log("RECEIVER FULL OBJECT:", JSON.stringify(receiver || {}, null, 2));

// 1. check accounts FIRST
        if (!sender) throw new Error("Sender account not found");
        if (!receiver) throw new Error("Receiver account not found");

// 2. check user population SAFELY
        if (!sender?.user) throw new Error("Sender user not linked to account");
        if (!receiver?.user) throw new Error("Receiver user not linked to account");

        if (senderAccount === receiverAccount)
            throw new Error("Cannot transfer to same account");

        if (sender.balance < amount)
            throw new Error("Insufficient balance");

        // 3. External transfer call
        const response = await transferService({
            from: senderAccount,
            to: receiverAccount,
            amount
        });

        if (response.status !== "SUCCESS") {
            throw new Error("Transfer failed");
        }

        // 4. Update balances
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({ session });
        await receiver.save({ session });

        // 5. Save transaction
        const transaction = await Transaction.create([{
            senderAccount,
            receiverAccount,
            amount,
            reference: response.reference,
            status: response.status
        }], { session });

        // 6. Commit DB
        await session.commitTransaction();
        session.endSession();

        console.log("SENDER:", sender);
        console.log("SENDER USER:", sender?.user);

        console.log("RECEIVER:", receiver);
        console.log("RECEIVER USER:", receiver?.user);

        // 7. Emails (outside transaction)
        await Promise.all([
            sendEmail({
                to: sender?.user?.email,
                subject: `Debit Alert - ₦${amount.toLocaleString()}`,
                message: `
Hello ${sender.accountName},

₦${amount.toLocaleString()} has been debited.


Reference: ${response.reference}
`
            }),

            sendEmail({
                to: receiver?.user?.email,
                subject: `Credit Alert - ₦${amount.toLocaleString()}`,
                message: `
Hello ${receiver.accountName},

₦${amount.toLocaleString()} has been credited.

Sender: ${sender.accountName}

Reference: ${response.reference}
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
        console.error(error.stack);

        await session.abortTransaction();
        session.endSession();

        throw error;
    }
};

exports.getAllTransferService =
    async () => {

        const transactions =
            await Transaction.find()
                .sort({ createdAt: -1 });

        return {
            success: true,
            count: transactions.length,
            data: transactions
        };
    };

exports.getTransferService =
    async (reference) => {

        const transaction =
            await Transaction.findOne({
                reference
            });

        if (!transaction) {
            throw new Error(
                "Transaction not found"
            );
        }

        return {
            success: true,
            data: {
                transactionId:
                transaction.reference,

                senderAccount:
                transaction.senderAccount,

                receiverAccount:
                transaction.receiverAccount,

                amount:
                transaction.amount,

                status:
                transaction.status,

                createdAt:
                transaction.createdAt
            }
        };
    };