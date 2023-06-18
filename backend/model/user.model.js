import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    gender: { type: String },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    contact: { type: Number },
    image: { type: String },
},
    { timestamps: true }
)

userSchema.methods.generateAuthToekn = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRAT_KEY);
        return token;
    }
    catch (err) {
        console.log(err)
    }
}
export default mongoose.model("user", userSchema)
