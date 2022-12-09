const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const Products = require('../assets/products/products');
const Messages = require('../assets/messages/messages');
const handlebars = require("express-handlebars");

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productsContainer = new Products('./assets/products/products.json');
const messagesContainer = new Messages('./assets/messages/messages.json');

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './public/views');


// Home 
app.get('/', (req, res) => {
    res.render('index', {})
});

io.on('connection', async socket => {
    socket.emit('update_products', await productsContainer.getAllProducts());
    socket.emit('update_messages', await messagesContainer.getAllMessages());
    socket.on('new_product', async product => {
        await productsContainer.saveProduct(product);
        io.emit('update_products', await productsContainer.getAllProducts());
    });
    socket.on('new_message', async message => {
        await messagesContainer.saveMessage(message);
        io.emit('update_messages', await messagesContainer.getAllMessages());
    });
});

// Server listen
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening in port:  ${server.address().port}`);
});
server.on('error', error => console.log(`Server error ${error}`));