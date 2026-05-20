const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema ({
     senderAccount:{
        type: String,
        required: true
    },
    receiverAccount:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    reference:{
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'pending'

    },
},{ timestamps: true }
    )
module.exports = mongoose.model('Transaction',transactionSchema)