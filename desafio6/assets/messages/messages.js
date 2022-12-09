const fs = require('fs')

class Container{
    constructor(route){
        this.route = route
    }
    async getAllMessages(){
        try {
            let messages = await fs.promises.readFile(this.route, 'utf-8');
            return JSON.parse(messages)
        } catch (error) {
            console.error(error);
            return []
        }
    }
    async saveMessage(mensaje){
        const messages = await this.getAllMessages();
        try {
            messages.push(mensaje);
            await fs.promises.writeFile(this.route, JSON.stringify(messages, null, 2));
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Container;