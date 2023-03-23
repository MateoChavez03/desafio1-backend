import { Router } from "express";
import { fork } from "child_process";
import mathProblem from '../utils/mathProblem.js'

const MODE = process.env.MODE || "FORK"
const router = Router();

switch (MODE) {
    case "FORK":
        router.get('/randoms', async (req, res) => {
            const number = req.query.number;
            const childProcess = fork('./src/utils/mathProblem.js');
            if (number === undefined) {
                childProcess.send(10000)
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
        })

        break;
}

export default router