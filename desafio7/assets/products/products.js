const fs = require('fs');

class Container{
    constructor(route){
        this.route = route;
    }

    async getAllProducts(){
        try {
            let products = await fs.promises.readFile(this.route, 'utf-8');
            return JSON.parse(products)
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async saveProduct(product) {
        const products = await this.getAllProducts();
        try {
          if (products.length === 0) {
            product.id = 1;
            products.push(product);
            await fs.promises.writeFile(
              this.route,
              JSON.stringify(products, null, 2)
            );
          } else {
            let lastProduct = products[products.length - 1];
            product.id = lastProduct.id + 1;
            products.push(product);
            await fs.promises.writeFile(
              this.route,
              JSON.stringify(products, null, 2)
            );
          }
        } catch (error) {
          throw new Error(error);
        }
      }
}

module.exports = Container;