import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        productID: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        userID: {
            type: String,
        },
        variants: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("cart", CartSchema)



