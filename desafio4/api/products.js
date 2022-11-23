const fs = require('fs')

class Container{
    constructor(route){
        this.route = route;
    }

    async getAll(){
        try {
            let products = await fs.promises.readFile(this.route, 'utf-8');
            return JSON.parse(products)
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async update(product){
        const products = await this.getAll();
        const i = products.map(element => element.id).indexOf(product.id);
        if(i >= 0){
            const oldProduct = products[i];
            product.id = products[i].id;
            products[i] = product;
            try {
                await fs.promises.writeFile(this.route, JSON.stringify(products, null, 2));
                return [product, oldProduct]
            } catch (error) {
                console.error(error);
                return []
            }
        }
        else{
            console.log('Not found');
            return []
        }
    }

    newId(product, arr){
        arr.sort((a, b) => {return a - b});
        product.id = parseInt(arr[arr.length - 1].id) + 1;
        return product.id
    }

    checkId(product, arr){
        arr.forEach(element => {
            if(element.id == product.id){
                return this.newId(product, arr)
            } 
        });
        return product.id
    }

    checkLength(arr){
        if (arr.length === 0){
            console.log("No hay productos agregados a la lista");
            return false
        }
        return true
    }

    async saveProduct(product){
        const products = await this.getAll();
        product.id = parseInt(product.id);
        product.id = this.checkId(product, products);
        product.price = parseInt(product.price);
        try {
            products.push(product);
            await fs.promises.writeFile(this.route, JSON.stringify(products, null, 2));
            return product
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id){
        const products = await this.getAll();
        if(!this.checkLength(products)){
            return
        }
        let product = products.find(el => el.id == id);
        return product ? product : null
    }

    async deleteById(id){
        const products = await this.getAll();
        if(!this.checkLength(products)){
            return
        }
        const product = products.find(el => el.id == id);
        const newProducts = products.filter(el => el != product);
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(newProducts, null, 2))
            return product
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Container;