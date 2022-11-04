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
                console.log(`Product id: ${product.id}`);
                await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2));
            } else {
                let lastProduct = this.products[this.products.length - 1];
                product.id = lastProduct.id + 1;
                this.products.push(product);
                console.log(`Product id: ${product.id}`);
                await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2));
            }
            return product.id;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.url, 'utf-8');
            const products = await JSON.parse(data);
            let product = products.find((product) => product.id === id);
            if (product === undefined) {
                console.log(`Product with id ${id} doesn't exist`);
                return null;
            } else {
                console.log(`Product with id ${id}:\n`, product);
                return product;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.url, 'utf-8');
            const products = JSON.parse(data);
            console.log(`Products list:\n`, products);
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.url, 'utf-8');
            const products = JSON.parse(data);
            let product = products.find((product) => product.id === id);
            if (product === undefined) {
                console.log(`Product with id ${id} doesn't exist`);
                return null;
            } else {
                let position = products.indexOf(product);
                products.splice(position, 1);
                this.products = products;
                console.log(`The following product has been deleted successfully:\n`, product);
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
            console.log('File emptied successfully');
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