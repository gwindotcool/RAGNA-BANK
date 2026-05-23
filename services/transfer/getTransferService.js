const Transaction =
    require("../../models/TransactionHistory");

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
            data: transaction
        };
    };
