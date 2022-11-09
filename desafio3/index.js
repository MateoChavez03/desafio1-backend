import express from "express";
import { Container, Product } from "./container.js";

const http = express();

const container = new Container('./products.json')

const product1 = new Product("GTA V", 60, "urlImg1");
const product2 = new Product("Horizon Forbidden West", 80, "urlImg2");
const product3 = new Product("Halo Infinite", 80, "urlImg3");

await container.save(product1);
await container.save(product2);
await container.save(product3);


const server = http.listen(8080, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en el servidor ${error}`));

http.get("/products", async (req, res) => {
    res.send(await container.getAll());
})

http.get("/productRandom", async (req, res) => {
    res.send(await container.getRandom());
})

http.get("*", (req, res) => {
    res.send(`
    <main style="text-align: center">
        <h1>Welcome to my server, the url you are trying to access has no content</h1>
        <p>Try to access to </p>
        <a href="/products"> http:/localhost:${server.address().port}/products </a>
        <p> or </p>
        <a href="/productRandom"> http:/localhost:${server.address().port}/productRandom </a>
    </main>
    `);
})