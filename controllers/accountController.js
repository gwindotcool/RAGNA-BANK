const User = require("../models/User");
const Account = require("../models/Account");
const {createAccount}  = require("../services");
const getBalance = require("../services/account/getBalance")
const nameEnquiry = require("../services/account/nameEnquiry");




exports.createAccountController = async (req, res) => {
    try {
        const { userId } = req.body;

        // 🍼 1. Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // 🍼 2. Check verified FIRST
        if (!user.isVerified) {
            return res.status(400).json({
                message: "User not verified"
            });
        }

        // 🍼 3. Check if account already exists
        const existingAccount = await Account.findOne({ user: user._id });
        if (existingAccount) {
            return res.status(400).json({
                message: "User already has an account"
            });
        }

        // 🍼 4. Build payload
        const payload = {
            kycType: user.kycType,
            kycID: user.kycID,
            dob: user.dob.toISOString().split("T")[0]
        };

        // 🍼 5. Call API (NOW it's safe)
        const response = await createAccount(payload);

        if (!response.account) {
            return res.status(400).json({
                message: "Account creation failed"
            });
        }

        // 🍼 6. Save account
        const account = await Account.create({
            user: user._id,
            accountNumber: response.account.accountNumber,
            accountName: response.account.accountName,
            bankCode: response.account.bankCode,
            balance: response.account.balance
        });

        // 🍼 7. Return response
        return res.status(201).json({ user, account });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
};

exports.getAccountNameEnquiry = async (req, res) => {
    try {
        const {accountNumber} = req.params;
        const response = await nameEnquiry(accountNumber);
        return res.status(200).json(response);
    }catch(error){
        console.log(error.message);
        return res.status(400).json({message:error.message});
    }
}

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find()
            .populate("user")
        return res.status(200).json({
            success: true,
            count: accounts.length,
            data: accounts
        });
    }catch(error) {
        console.log(error.message);
        return res.status(400).json({message:error.message});
    }
}

exports.getBalanceController = async (req, res) => {
    try {
        const {accountNumber} = req.params;
        const response = await getBalance(accountNumber);
        return res.status(200).json(response);
    }catch(error) {
        console.log(error.message);
        return res.status(400).json({message:error.message});
    }
}