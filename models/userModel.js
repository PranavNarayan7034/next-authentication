import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, "Please Provide a USERNAME"],
        unique : true,
    },
    Password: {
        type: String,
        required: [true, "Please Provide a PASSWORD"],
    },
    Email: {
        type: String,
        required: [true, "Please Provide a EMAIL"],
        unique : true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    VerifyToken: String,
    VerifyTokenExpiry: Date,
})


const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;