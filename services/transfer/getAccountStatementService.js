const Transaction =
    require("../../models/TransactionHistory");

const Account =
    require("../../models/Account");


exports.getAccountStatementService =
    async (accountNumber) => {

        const account =
            await Account.findOne({
                accountNumber
            });

        if (!account) {
            throw new Error(
                "Account not found"
            );
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
                    }
                )
            );

        const closingBalance =
            account.balance;

        const openingBalance =
            closingBalance +
            totalCredits -
            totalDebits;

        return {

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
        };
    };