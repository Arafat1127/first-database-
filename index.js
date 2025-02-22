const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 7000;
//middleware  card-n242-3   durymGg0WFVfl7j4 

app.use(cors())
//req.body =undefined solve
app.use(express.json());

const uri = "mongodb+srv://card-n242-3:durymGg0WFVfl7j4@cluster0.z1t2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db('Simple-Node')
        const productCollection = database.collection('Products')

        app.get('/products', async (req, res) => {
            const products = await productCollection.find({}).toArray();
            res.send(products)
        })

        app.post('/add-product', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product)
            res.send(result)

        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

//specific product search by id == route
// app.get('/products/:id', (req, res) => {
//     const id = req.params.id;
//     const searchProduct = productsList.find(product => product.id === parseInt(id)) || {}
//     res.send(searchProduct)
//     console.log(searchProduct);

// })


app.listen(port, () => {
    console.log(`our server run on ${port}`);

})