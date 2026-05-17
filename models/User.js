

// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,

        password: {
            type: String,
            required: true,
        },
        kycType:{
            type: String,
            enum:["bvn", "nin"]
        },
        kycID:String,
        dob:Date,
        isVerified:{type:Boolean, default: false},

    },{timestamps:true}
)
module.exports = mongoose.models.User || mongoose.model("User", userSchema);