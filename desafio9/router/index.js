import express from "express";
import {normalize, denormalize, schema} from "normalizr";
import mongoose from "mongoose";
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import * as handlebars from 'express-handlebars';
import { productsFaker, messages } from '../daos/index.js'

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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
    const products = productsFaker.createMany(5)
    socket.emit('update_products', products);
    socket.emit('update_messages', await messages.getAll());
    socket.on('new_message', async message => {
        await messages.saveMessage(message);
        io.emit('update_messages', await messages.getAll());
    });
});

// Server listen
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening in port:  ${server.address().port}`);
});
server.on('error', error => console.log(`Server error ${error}`));
mongoose.connect('mongodb+srv://CoderUser:123@clustermateochavez38140.scwmyko.mongodb.net/eccomerce?retryWrites=true&w=majority', 
err => { err ? console.log(err) : console.log("Base conectada a Mongo correctamente")})

const authorSchema = new schema.Entity('authors');
const schemaMessages = new schema.Entity('messages', {
    author: authorSchema
});
const data = await messages.getAll();
const modifiedData = {
    messages: data,
    id: "messages"
}

const normalizedData = normalize(modifiedData, schemaMessages);
console.log(JSON.stringify(normalizedData, null, '\t'));