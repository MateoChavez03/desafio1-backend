const express = require('express');
const app = express();
const PORT = 8080;

// Container

const Container = require('./api/products');
const container = new Container('./assets/products.json');

// Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// View engine

app.set("views", "./views");
app.set("view engine", "ejs");

// Home

app.get("/", (req, res) => {
    res.render("home", {});
});

// Products

app.post("/products", async (req, res) => {
    let product = req.body;
    if (product) {
        await container.saveProduct(product);
        res.redirect("/");
    } else {
        res.sendStatus(400);
    }
});

app.get("/products", async (req, res) => {
    const products = await container.getAll();
    res.render("products", {products});
})

// Not found 

app.get("*", (req, res) => {
    res.render("notFound", {});
})

// Server listen

const server = app.listen(PORT, () => {
    console.log(`Server listening in port:  ${server.address().port}`);
});
server.on('error', error => console.log(`Server error ${error}`));