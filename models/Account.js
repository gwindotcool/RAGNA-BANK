// src/models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accountNumber: String,
    accountName: String,
    bankCode: String,
    balance: { type: Number, default: 15000 }
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema)