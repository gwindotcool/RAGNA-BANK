const Transaction =
    require("../../models/TransactionHistory");

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