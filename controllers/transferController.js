const mongoose = require("mongoose");
const Transaction = require('../models/TransactionHistory');
const Account = require('../models/Account');
const sendEmail = require('../services/notification/sendMail');



const {
    transferFundsService,
    getAllTransferService,
    getTransferService,
    getAccountTransactionsService,
    getAccountStatementService
} = require("../services/transfer");

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

exports.getAllTransfer = async (req, res) => {
    try {
        const result =
            await getAllTransferService();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.getTransfer = async (req, res) => {
    try {
        const result =
            await getTransferService(
                req.params.reference
            );

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.getAccountTransactions = async (req, res) => {
    try {
        const result =
            await getAccountTransactionsService(
                req.params.accountNumber
            );

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

exports.getAccountStatement = async (req, res) => {
    try {
        const result =
            await getAccountStatementService(
                req.params.accountNumber
            );

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};