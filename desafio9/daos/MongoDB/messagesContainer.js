import mongoose from "mongoose";

// Model messages
const messagesColl = 'messages';

const messagesSchema = new mongoose.Schema({
    author: {
        id: {type: String, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        age: {type: Number, required: true},
        nickname: {type: String, required: true}
    },
    msg: {type: String, required: true},
    timestamp: {type: String, required: true}
})


export const messagesDAO = mongoose.model(messagesColl, messagesSchema)

export default class MessageContainer{

    async getAll(){
        try {
            const messages = await messagesDAO.find({});
            return messages
        } catch (error) {
            console.error(error);
            return []
        }
    }

    async saveMessage(message) {
        try {
            message.timestamp = this.setDate()
            const response = await messagesDAO.create(message)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
    
    setDate() {
        let today = new Date();
        let minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = `0${today.getMinutes()}`
        }
        let date = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()} ${today.getHours()}:${minutes}`;
        return date
    }

    async normalize(){
        const messages = await this.getAll()
        messages.id = "messages"
        const normalizedData = normalize(messages, post)
        console.log(JSON.stringify(normalizedData, null, '\t'))
    }
}