const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    sold: { type: Boolean, required: true },
    dateOfSale: { type: Date, required: true }
})


const ProductModel = mongoose.model("Product", productSchema)


module.exports = {ProductModel}