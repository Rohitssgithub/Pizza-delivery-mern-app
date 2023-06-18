import mongoose from "mongoose";

const PizzSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    varients: [{ type: String, required: true }],
    prices: {
        type: Array,
        required: true
    },
    category: { type: String, required: true, },
    image: { type: String },
    description: { type: String, required: true, }
},
    {
        timestamps: true,
    }

)

export default mongoose.model("pizzas", PizzSchema)