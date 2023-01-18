import mongoose from "mongoose";
import { messages } from "./documents/messages.js";
import { products } from "./documents/products.js"
import { productsDAO } from "./models/products.js";
import { messagesDAO } from "./models/messages.js";

const CRUD = async () => {
  try {
    // Conection "Ecommerce" data base:
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Data base conected succesfully");

    // Insert documents to collection "messages":
    const insertedMessages = [];
    for (const message of messages) {
      insertedMessages.push(messagesDAO.create(message))
    };
    const resultMessages = await Promise.allSettled(insertedMessages);

    const rejectedMessages = resultMessages.filter(r => r.status == 'rejected');
    if (rejectedMessages.length > 0) {
      console.log('Failures: ' + rejectedMessages.length);
    } else {
      console.log("All Fine!");
    }

    // Read collection "messages":
    const collMessages = await messagesDAO.find({});
    console.log("Messages:", collMessages, "Messages quantity:", collMessages.length);

    // Insert documents to collection "products":
    const insertedProducts = [];
    for (const product of products) {
      insertedProducts.push(productsDAO.create(product))
    };
    const resultProducts = await Promise.allSettled(insertedProducts);

    const rejectedProducts = resultProducts.filter(r => r.status == 'rejected');
    if (rejectedProducts.length > 0) {
      console.log('Failures: ' + rejectedProducts.length);
    } else {
      console.log("All Fine!");
    }

    // Read collection "Products":
    let collProducts = await productsDAO.find({});
    console.log("Products:", collProducts, "Products quantity:", collProducts.length);

    // Add new Product to collection "Products"
    const newProduct = {
      timestamp: new Date(),
      name: "Subnautica",
      url: "urlImg11",
      price: 1200
    }
    await new productsDAO(newProduct).save();
    collProducts = await productsDAO.find({});
    console.log("New product added succesfully:", newProduct, "Products quantity:", collProducts.length);

    //List products cheaper than $1000
    let rta = await productsDAO.find({ price: { $lte: 1000 } });
    console.log("Products cheaper than $1000", rta);

    //List products between $1000 and $3000
    rta = await productsDAO.find({ price: { $lte: 3000, $gte: 1000 } });
    console.log("Products between $1000 and $3000", rta);

    //List products more expensive than $3000
    rta = await productsDAO.find({ price: { $gte: 3000 } });
    console.log("Products more expensive than $3000", rta);

    //Third cheapest product
    rta = await productsDAO.find({}, { _id: 0, __v: 0, price: 0, url: 0, timestamp: 0 }).sort({ price: 1 }).limit(1).skip(2)
    console.log("Third cheapest product", rta);

    //Update stock to 100 (all products)
    rta = await productsDAO.updateMany({}, { stock: 100 })
    console.log("Stock updated to 100", rta)

    //Update stock to 0 in products more expensive than $4000
    rta = await productsDAO.updateMany({ price: { $gte: 4000 } }, { stock: 0 })
    console.log("Stock updated to 0", rta)

    //Delete products cheaper than $1000
    rta = await productsDAO.deleteMany({ price: { $lte: 1000 } })
    console.log("Products deleted succesfully", rta);

    //Final list
    console.log("Final list:", await productsDAO.find({}));

    await mongoose.disconnect()
  } catch (err) {
    console.log(err);
  }
}

CRUD();

// Comandos que use para crear usuario:

/* 
  db.createUser(
    {
      user: "pepe",
      pwd: "asd456",
      roles: [
        {
          role: "read", db: "ecommerce"
        }
      ]
    }
  )
*/