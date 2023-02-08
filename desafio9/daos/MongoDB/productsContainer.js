import mongoose from "mongoose";

// Model Products
const productsColl = 'products';

const productsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    price: {type: Number, required: true},
    timestamp: {type: String, required: true}
})

export const productsDAO = mongoose.model(productsColl, productsSchema)

export default class ProductContainer{

    async getAll(){
        try {
            const products = await productsDAO.find({});
            console.log(products);
            return products
        } catch (error) {
            console.error(error);
            return []
        }
    }

    async saveProduct(product) {
        try {
            product.timestamp = this.setDate()
            const response = await productsDAO.create(product)
            console.log(response);
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
    
    setDate() {
        let today = new Date();
        let minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = `0${today.getMinutes()}`
        }
        let date = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()} ${today.getHours()}:${minutes}`;
        return date
    }
}