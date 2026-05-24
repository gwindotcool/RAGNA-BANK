module.exports = (req,res,next) => {
    const {
        senderAccount,
        receiverAccount,
        amount
    } = req.body

    if (!senderAccount || !receiverAccount || !amount) {
        return res.status(401).json({
            success: false,
            message: "Invalid Credentials",
        })
    }
    if (isNaN(amount)) {
        return res.status(401).json({
            success: false,
            message: "invalid amount",
        })
    }
    if (amount <= amount) {
        return res.status(401).json({
            success: false,
            message: "invalid amount",
        })

    }
    next();getAllTransferService
}