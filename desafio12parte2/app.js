import express from 'express';
import infoRouter from './routes/info.router.js';
import randomsRouter from './routes/randoms.router.js';

const PORT = process.env.PORT || 8080

const app = express();

app.use('/', infoRouter)
app.use('/api', randomsRouter)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))