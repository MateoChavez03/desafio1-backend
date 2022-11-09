const express = require("express")
const http = express();

const Container = require("./container.js")

const container = new Container("./products.json");

const PORT = process.env.PORT || 8080;

const server = http.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

http.get("/products", async (req, res) => {
  res.send(await container.getAll());
});

http.get("/productRandom", async (req, res) => {
  res.send(await container.getRandom());
});

http.get("*", (req, res) => {
  res.send(`
    <main style="text-align: center">
        <h1>Welcome to my server, the url you are trying to access has no content</h1>
        <p>Try to access to </p>
        <a href="/products"> http:/localhost:${
          PORT
        }/products </a>
        <p> or </p>
        <a href="/productRandom"> http:/localhost:${
          PORT
        }/productRandom </a>
    </main>
    `);
});
