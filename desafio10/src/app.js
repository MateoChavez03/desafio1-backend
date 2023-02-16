import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb+srv://CoderUser:123@clustermateochavez38140.scwmyko.mongodb.net/eccomerce?retryWrites=true&w=majority")

app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://CoderUser:123@clustermateochavez38140.scwmyko.mongodb.net/eccomerce?retryWrites=true&w=majority",
        ttl:20
    }),
    secret: 'aspdiasc903ok1pkc',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30000}
}));

app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);


app.listen(PORT, () => console.log(`Listening on ${PORT}`))