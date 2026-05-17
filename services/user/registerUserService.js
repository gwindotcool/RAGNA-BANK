const User = require("../../models/User");
const Account = require("../../models/Account");

const createAccount = require("../account/createAccount")
console.log("🔥 createAccount SERVICE LOADED");
const validateBVN = require("../bvn/validateBVN");
const validateNIN = require("../nin/validateNIN");



module.exports = async ({ name, email,password, kycType, kycID, dob }) => {

    // 🍼 1. Check required fields
    if (!kycType || !kycID) {
        throw new Error("kycType and kycID are required");
    }

    let validation;

    // 🍼 2. Validate KYC
    if (kycType === "bvn") {
        validation = await validateBVN({ bvn: kycID });
    } else if (kycType === "nin") {
        validation = await validateNIN({ nin: kycID });
    } else {
        throw new Error("Invalid kycType");
    }

    // 🍼 3. Check validation result
    if (!validation.success) {
        throw new Error("Invalid KYC ID");
    }

    // 🍼 4. Prevent duplicate user
    const existingUser = await User.findOne({ kycID });
    if (existingUser) {
        throw new Error("User with this KYC already exists");
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);


    // 🍼 5. Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        kycType,
        kycID,
        dob,
        isVerified: true
    });

    // 🍼 6. Prepare account payload
    const payload = {
        kycType: user.kycType,
        kycID: user.kycID,
        dob: user.dob.toISOString().split("T")[0]
    };
    console.log("➡️ PAYLOAD FOR ACCOUNT:", payload);

    // 🍼 7. Create account from API
    const accountResponse = await createAccount(payload);

    if (!accountResponse.account) {
        throw new Error("Account creation failed");
    }

    // 🍼 8. Save account
    const account = await Account.create({
        user: user._id,
        accountNumber: accountResponse.account.accountNumber,
        accountName: accountResponse.account.accountName,
        bankCode: accountResponse.account.bankCode,
        balance: accountResponse.account.balance
    });

    // 🍼 9. Return both
    return { user, account };
};