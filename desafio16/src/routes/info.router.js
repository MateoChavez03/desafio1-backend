import { Router } from "express";
import process from 'process';
import os from 'os';

const CPUs = os.cpus().length

const router = Router();

router.get('/info', (req, res) => {
    res.send({
        CPUs,
        processId: process.pid,
        args: process.argv,
        path: process.execPath,
        platform: process.platform,
        node: process.version,
        memory: process.memoryUsage().rss,
        folder: process.cwd(),
        environment: process.env.ENVIRONMENT || "development"
    })
})

export default router