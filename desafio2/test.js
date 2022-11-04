import {Container, Product} from "./index.js";

const container = new Container('./products.json')

const product1 = new Product("GTA V", 60, "urlImg1");
const product2 = new Product("Horizon Forbidden West", 80, "urlImg2");
const product3 = new Product("Halo Infinite", 80, "urlImg3");

container.save(product1);
container.save(product2);
container.save(product3);

container.getById(4);
container.getById(2);

container.getAll();

container.deleteById(2);

setTimeout(() => {  
    container.deleteAll();
}, 5000);
