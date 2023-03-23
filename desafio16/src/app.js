import express from 'express';
import infoRouter from './routes/info.router.js';
import randomsRouter from './routes/randoms.router.js';
import cluster from 'cluster';
import os from 'os';

const CPUs = os.cpus().length;
const MODE = process.env.MODE || "FORK"
const app = express();
let PORT = process.env.PORT || 8080

switch (MODE) {
    case "CLUSTER":
        if(cluster.isPrimary){
            for(let i = 0; i < CPUs; i++) {
                cluster.fork()
            }
            cluster.on('exit',()=>{
                cluster.fork();
            })
        }else{
            app.listen(PORT, ()=>console.log(`Listening on port ${PORT}, in mode: "${MODE}"`))
        }

        break;
    case "FORK":
        app.listen(PORT, ()=>console.log(`Listening on port ${PORT}, in mode: "${MODE}"`))

        break;
    default:
        app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))
        break;
}

app.use('/', infoRouter)
app.use('/api', randomsRouter)