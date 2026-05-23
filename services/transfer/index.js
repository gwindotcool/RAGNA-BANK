const {
    transferFundsService
} = require("./transferFundsService");

const {
    getAllTransferService
} = require("./getAllTransferService");

const {
    getTransferService
} = require("./getTransferService");

const {
    getAccountTransactionsService
} = require("./getAccountTransactionsService");

const {
    getAccountStatementService
} = require("./getAccountStatementService");

module.exports = {
    transferFundsService,
    getAllTransferService,
    getTransferService,
    getAccountTransactionsService,
    getAccountStatementService
};