import fs from "fs";

export class Container {
    constructor(url){
        this.url = url;
        this.products = [];
    }

    async save(product) {
        try {
            if(this.products.length === 0) {
                product.id = 1;
                this.products.push(product);
                await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2));
            } else {
                let lastProduct = this.products[this.products.length - 1];
                product.id = lastProduct.id + 1;
                this.products.push(product);
                await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2));
            }
            return product.id;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.url, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async getRandom() {
        try {
            const products = await this.getAll();
            return products.length === 0 ? null : products[Math.floor(Math.random() * products.length)]
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            let product = products.find((product) => product.id === id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll();
            let product = products.find((product) => product.id === id);
            if (product === undefined) {
                return null;
            } else {
                let position = products.indexOf(product);
                products.splice(position, 1);
                this.products = products;
                await fs.promises.writeFile(this.url, JSON.stringify(products, null, 2));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            this.products = []
            await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }
}

export class Product {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}