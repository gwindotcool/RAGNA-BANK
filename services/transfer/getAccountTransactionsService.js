const Transaction =
    require("../../models/TransactionHistory");

const Account =
    require("../../models/Account");

exports.getAccountTransactionsService =
    async (accountNumber) => {

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

        const formattedTransactions =
            await Promise.all(
                transactions.map(
                    async (
                        transaction
                    ) => {

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
                    }
                )
            );

        return {
            success: true,
            count:
            transactions.length,
            data:
            formattedTransactions
        };
    };