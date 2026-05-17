const validateBVN = require("./bvn/validateBVN");
const insertBVN = require("./bvn/insertBvnService");
const validateNIN = require("./nin/validateNIN");
const createAccount = require("./account/createAccount");


module.exports = {
    validateBVN,
    insertBVN,
    validateNIN,
    createAccount

}