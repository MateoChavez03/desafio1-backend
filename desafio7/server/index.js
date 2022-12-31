import express from "express";
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { optionsMDB } from "../options/mariaDB.js";
import { optionsSQLite } from "../options/SQLite.js"
import Container from "../utils/container.js"
import * as handlebars from 'express-handlebars';

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productsContainer = new Container(optionsMDB, "products");
const messagesContainer = new Container(optionsSQLite, "messages");

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
    socket.emit('update_products', await productsContainer.getAll());
    socket.emit('update_messages', await messagesContainer.getAll());
    socket.on('new_product', async product => {
        await productsContainer.save(product);
        io.emit('update_products', await productsContainer.getAll());
    });
    socket.on('new_message', async message => {
        await messagesContainer.save(message);
        io.emit('update_messages', await messagesContainer.getAll());
    });
});

// Server listen
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening in port:  ${server.address().port}`);
});
server.on('error', error => console.log(`Server error ${error}`));