import mongoose from "mongoose";

const messagesColl = 'messages'

const MessagesSchema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    mail: {type: String, required: true},
    msg: {type: String, required: true}
});

export const messagesDAO = mongoose.model(messagesColl, MessagesSchema);