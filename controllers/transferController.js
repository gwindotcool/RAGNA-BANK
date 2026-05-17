const mongoose = require("mongoose");
const transferService = require('../services/account/transfer');
const Transaction = require('../models/TransactionHistory');
const Account = require('../models/Account');

exports.transferFunds = async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction()

        const {senderAccount, receiverAccount, amount} = req.body;
        const sender = await Account.findOne({
            accountNumber:
            senderAccount
        }).session(session)

        const receiver = await Account.findOne({
            accountNumber:
            receiverAccount
        }).session(session)
        if (!sender) {
            throw new Error(
                "Sender account not found"
            );
        }
        if (!receiver) {
            throw new Error(
                "Sender account not found"
            )
        }
        if (senderAccount === receiverAccount) {
            throw new Error(
                "Sender account not found"
            )
        }
        if(sender.balance < amount) {
            throw new Error(
                "Insufficient balance"
            )
        }




        const payload = {
                from: senderAccount,
                to: receiverAccount,
                amount,
        };

        const response = await transferService(payload);
        console.log(
            "🔥 TRANSFER RESPONSE:",
            response
        );

        if (response.status === "SUCCESS") {
            sender.balance -= amount;
            receiver.balance += amount;
            await sender.save({session});
            await receiver.save({session});

        }

        const transaction = await Transaction.create([{
            senderAccount,
            receiverAccount,
            amount,
            reference: response.reference,
            status:
            response.status.toLowerCase()
        }],{
            session
            })
        await session.commitTransaction()
        session.endSession();
        return res.status(200).json({
            success: true,
            message:'Transfer successfully.',
            data: {
                response,
                transaction
            }
        });
    }catch(error){
        console.log(error.message);
        return res.status(400).json({message: error.message});
    }
}

exports.getAllTransfer = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    }catch(error){
        console.log(error.message);
        return res.status(400).json({message: error.message});
    }
}

exports.getTransfer = async (req, res) => {
    try {
        const { reference } = req.params;
        const transaction = await Transaction.findOne({reference}).session(session)
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found.",
            })
        }

        return res.status(200).json({
            success: true,
            data: transaction
        })

    }catch(error){
        console.log(error.message);
        return res.status(400).json({message: error.message});
    }
}

exports.getAccountTransactions = async (req, res) => {
    try {
        const {accountNumber} = req.params;
        const transactions = await Transaction.find({
            $or:[
                {
                    senderAccount: accountNumber
                },
                {
                    receiverAccount: accountNumber
                }
            ]
        }).sort({
            createdAt:-1
        })


        const formattedTransactions =
            transactions.map(
                (transaction) => {

                    const isSender =
                        transaction
                            .senderAccount ===
                        accountNumber;

                    return {

                        type:
                            isSender
                                ? "debit"
                                : "credit",

                        amount:
                        transaction.amount,

                        reference:
                        transaction.reference,

                        status:
                        transaction.status,

                        from:
                            !isSender
                                ? transaction.senderAccount
                                : null,

                        to:
                            isSender
                                ? transaction.receiverAccount
                                : null,

                        createdAt:
                        transaction.createdAt
                    };
                });


        return res.status(200).json({
            success: true,

            count: transactions.length,

            data: formattedTransactions
        })
    }catch(error){
        console.log(error.message);
        return res.status(400).json({message: error.message});
    }
};
