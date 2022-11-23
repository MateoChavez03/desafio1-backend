const express = require('express');
const app = express();
const { Router } = express;
const PORT = 8080;

const Container = require('./api/products');
const products = new Container('./assets/products.json');

app.use(express.static('public'));

const productsRouter = new Router();
productsRouter.use(express.json());
productsRouter.use(express.urlencoded({extended: true}));

productsRouter.get('/', async (req, res)=>{
    const productsArr = await products.getAll();
    productsArr.length > 0 ? res.json(productsArr) : res.sendStatus(400);
});

app.use('/api/products', productsRouter);

productsRouter.get('/:id', async (req, res)=> {
    const product = await products.getById(req.params.id);
    product ? res.json(product) : res.sendStatus(404);
});

productsRouter.post('/', async (req, res) => {
    let product = req.body;
    if(product){
        product = await products.saveProduct(product);
        res.json(product);
    }
    else{
        res.sendStatus(400);
    };
})

productsRouter.delete('/:id', async (req, res) => {
    const product = req.params.id;
    try {
        let deleted = await products.deleteById(product)
        res.json({
            deletedProduct : deleted,
            products : await products.getAll()
        })
    } catch (error) {
        throw new Error(error);
    }
})

productsRouter.put('/:id', async (req, res) => {
    const result = await products.update(req.body, req.params.id);
    if(result.length > 0){
        res.send(`
        El producto : ${JSON.stringify(result[1])}\n
        fue reemplazado por : ${JSON.stringify(result[0])}
        en la posición : ${result[0].id}
        `);
    }
    else{
        res.sendStatus(400);
    }
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));