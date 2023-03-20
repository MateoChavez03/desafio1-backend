import dotenv from 'dotenv'

dotenv.config()

export default {
    mongo: {
        URL: process.env.MONGO_URL
    },
    github: {
        CLIENT_ID: process.env.CLIENT_ID,
        SECRET: process.env.GITHUB_SECRET
    }
}