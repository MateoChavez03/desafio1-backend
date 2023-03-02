import { Router } from "express";
import process from 'process'

const router = Router();

router.get('/info', (req, res) => {
    res.send({
        processId: process.pid,
        args: process.argv,
        path: process.execPath,
        platform: process.platform,
        node: process.version,
        memory: process.memoryUsage().rss,
        folder: process.cwd()
    })
})

export default router