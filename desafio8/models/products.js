import mongoose from "mongoose";

const productsColl = 'products'

const ProductsSchema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number}
});

export const productsDAO = mongoose.model(productsColl, ProductsSchema);