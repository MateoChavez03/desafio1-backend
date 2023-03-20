import { Router } from "express";
import { fork } from "child_process";
import args from '../utils/minimist.js';
import mathProblem from '../utils/mathProblem.js'

const router = Router();

switch (args.mode) {
    case "FORK":
        router.get('/randoms', async (req, res) => {
            const number = req.query.number;
            const childProcess = fork('./utils/mathProblem.js');
            if (number === undefined) {
                childProcess.send(100000000)
            } else {
                childProcess.send(number);
            }
            childProcess.on('message', value => {
                res.send(value)
            })
        })
        break;
    case "CLUSTER":
        router.get('/randoms', async (req, res) => {
            const number = req.query.number;
            res.send(mathProblem(number))
        })
        
        break;
    default:
        router.get('/randoms', async (req, res) => {
            const number = req.query.number;
            res.send(mathProblem(number))
            console.log(process.pid);
        })

        break;
}

export default router