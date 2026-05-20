const {
    transferFundsService,
    getAllTransferService,
    getTransferService
} = require(
    '../services/account/transferFundsService'
);

const mongoose = require("mongoose");
const Transaction = require('../models/TransactionHistory');
const Account = require('../models/Account');
const sendEmail = require('../services/notification/sendMail');

exports.transferFunds = async (req, res) => {
    try {

        const result =
            await transferFundsService(req.body);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });
    }
};
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
            await Promise.all(

                transactions.map(
                    async (transaction) => {

                        const isSender =
                            transaction.senderAccount ===
                            accountNumber;

                        const otherAccountNumber =
                            isSender
                                ? transaction.receiverAccount
                                : transaction.senderAccount;

                        const otherAccount =
                            await Account.findOne({
                                accountNumber:
                                otherAccountNumber
                            });

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

                            ...(isSender
                                ? {
                                    to: {
                                        accountNumber:
                                        otherAccountNumber,

                                        accountName:
                                        otherAccount
                                            ?.accountName
                                    }
                                }
                                : {
                                    from: {
                                        accountNumber:
                                        otherAccountNumber,

                                        accountName:
                                        otherAccount
                                            ?.accountName
                                    }
                                }),

                            createdAt:
                            transaction.createdAt
                        };
                    })
            );

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
exports.getAccountStatement =
    async (req, res) => {

        try {

            const {
                accountNumber
            } = req.params;

            const account =
                await Account.findOne({
                    accountNumber
                });

            if (!account) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Account not found"
                    });
            }

            const transactions =
                await Transaction.find({

                    $or: [

                        {
                            senderAccount:
                            accountNumber
                        },

                        {
                            receiverAccount:
                            accountNumber
                        }

                    ]

                }).sort({
                    createdAt: -1
                });

            let totalCredits = 0;
            let totalDebits = 0;

            const formattedTransactions =
                await Promise.all(

                    transactions.map(
                        async (transaction) => {

                            const isSender =
                                transaction.senderAccount
                                === accountNumber;

                            const otherAccountNumber =
                                isSender
                                    ? transaction.receiverAccount
                                    : transaction.senderAccount;

                            const otherAccount =
                                await Account.findOne({
                                    accountNumber:
                                    otherAccountNumber
                                });

                            if (isSender) {
                                totalDebits +=
                                    transaction.amount;
                            } else {
                                totalCredits +=
                                    transaction.amount;
                            }

                            return {

                                type:
                                    isSender
                                        ? "debit"
                                        : "credit",

                                amount:
                                transaction.amount,

                                reference:
                                transaction.reference,

                                ...(isSender
                                    ? {
                                        to: {
                                            accountNumber:
                                            otherAccountNumber,

                                            accountName:
                                            otherAccount
                                                ?.accountName
                                        }
                                    }
                                    : {
                                        from: {
                                            accountNumber:
                                            otherAccountNumber,

                                            accountName:
                                            otherAccount
                                                ?.accountName
                                        }
                                    }),

                                createdAt:
                                transaction.createdAt
                            };
                        })
                );

            const closingBalance =
                account.balance;

            const openingBalance =
                closingBalance
                - totalCredits
                + totalDebits;

            return res
                .status(200)
                .json({

                    success: true,

                    data: {

                        accountNumber:
                        account.accountNumber,

                        accountName:
                        account.accountName,

                        openingBalance,

                        totalCredits,

                        totalDebits,

                        closingBalance,

                        transactionCount:
                        transactions.length,

                        transactions:
                        formattedTransactions
                    }
                });

        } catch(error){

            console.log(
                error.message
            );

            return res
                .status(500)
                .json({
                    message:
                    error.message
                });
        }
    };

exports.getAllTransfer =
    async (req, res) => {
        try {

            const result =
                await getAllTransferService();

            return res
                .status(200)
                .json(result);

        } catch (error) {

            return res
                .status(400)
                .json({
                    message:
                    error.message
                });
        }
    };

exports.getTransfer =
    async (req, res) => {
        try {

            const result =
                await getTransferService(
                    req.params.reference
                );

            return res
                .status(200)
                .json(result);

        } catch (error) {

            return res
                .status(400)
                .json({
                    message:
                    error.message
                });
        }
    };