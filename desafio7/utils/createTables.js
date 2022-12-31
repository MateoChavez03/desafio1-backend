import knex from "knex";
import { optionsMDB } from "../options/mariaDB.js";
import { optionsSQLite } from "../options/SQLite.js"
import Container from "./container.js";

const productsContainer = new Container(optionsMDB, "products");
const messagesContainer = new Container(optionsSQLite, "messages");
const mariaDBClient = knex(optionsMDB);
const SQLiteClient = knex(optionsSQLite);

// Products
try {
    if (await mariaDBClient.schema.hasTable("products")) {
        const products = await productsContainer.getAll();
        if (products.length > 0){
            await mariaDBClient.schema.dropTableIfExists('products');
            await mariaDBClient.schema.createTable('products', table => {
                table.increments('id').primary();
                table.string('name', 50).notNullable();
                table.string('src', 50).notNullable();
                table.float('price').notNullable();
                console.log("Empty table 'products' created succesfully");
            });
            await mariaDBClient("products").insert(products)
            .then(() => console.log("Products added to table 'products' succesfully"))
            .catch(error => { throw new Error(error) })
            .finally(() => { mariaDBClient.destroy() });
        } else {
            console.log("Table 'products' empty");
        }
    } else {
        await mariaDBClient.schema.dropTableIfExists('products')
        await mariaDBClient.schema.createTable('products', table => {
            table.increments('id').primary();
            table.string('name', 50).notNullable();
            table.string('src', 50).notNullable();
            table.float('price').notNullable();
            console.log("Empty table 'products' created succesfully");
        })
    }
} catch (error) {
    throw new Error(error)
}

// Messages
try {
    if (await SQLiteClient.schema.hasTable("messages")) {
        const messages = await messagesContainer.getAll();
        if (messages.length > 0) {
            await SQLiteClient.schema.dropTableIfExists('messages')
            await SQLiteClient.schema.createTable('messages', table => {
                table.increments('id').primary();
                table.string('date', 25).notNullable();
                table.string('mail', 50).notNullable();
                table.string('msg', 255).notNullable();
                console.log("Empty table 'messages' created succesfully");
            })
            await SQLiteClient("messages").insert(messages)
            .then(() => console.log("Messages added to table 'messages' succesfully"))
            .catch(error => { throw new Error(error) })
            .finally(() => { SQLiteClient.destroy() })
        } else {
            console.log("Table 'messages' empty");
        }
    } else {
        await SQLiteClient.schema.dropTableIfExists('messages')
        await SQLiteClient.schema.createTable('messages', table => {
            table.increments('id').primary();
            table.string('date', 25).notNullable();
            table.string('mail', 50).notNullable();
            table.float('msg', 255).notNullable();
            console.log("Empty table 'messages' created succesfully");
        })
    }
} catch (error) {
    throw new Error(error)
}