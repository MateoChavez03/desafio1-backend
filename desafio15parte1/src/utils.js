import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import winston from 'winston';

const customLevelsOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        http:3,
        debug:4,
        info:5
    }
}

export const logger = winston.createLogger({
    levels:customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"info"
        }),
        new winston.transports.File({
            filename: "error.log",
            level:"error"
        })
    ]
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salts)
}
export const validatePassword = async(password, userPassword) =>{
    return bcrypt.compare(password, userPassword);
}

export default __dirname;