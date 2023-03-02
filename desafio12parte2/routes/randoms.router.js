import { Router } from "express";
import { fork } from "child_process";

const router = Router();

router.get('/randoms', async (req, res) => {
    const number = req.query.number;
    const childProcess = fork('./utils.js');
    if (number === undefined) {
        childProcess.send(100000000)
    } else {
        childProcess.send(number);
    }
    childProcess.on('message', value => {
        res.send(value)
    })
})

export default router