import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import minimist from 'minimist';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import initializeStrategies from './config/passport.js';
import config from './config/dotenv.js';

// Minimist
const args = minimist(process.argv.slice(2), {
    alias: {p: "port"},
    default: {p: 8080}
})

// App
const app = express();
const PORT = args.port;
mongoose.connect(config.mongo.URL)

// Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.URL,
        ttl:20
    }),
    secret: 'aspdiasc903ok1pkc',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30000}
}));


// Passport
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());


// View Engine 
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Router
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);


app.listen(PORT, () => console.log(`Listening on ${PORT}`))