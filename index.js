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
        const productCollection = database.collection('products')
        const bookingCollection = client.db('Simple-Node').database.collection('booking')

        app.post('/add-product', (req, res) => {
            const product = req.body;
            product.id = productsList.length + 1
            productsList.push(product)
            console.log(product);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Basic Router")
})


const productsList = [
    { name: 't-shirt', price: 450, id: 1, img: "https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_640.png" },
    { name: 'shirt', price: 250, id: 2, img: "https://m.media-amazon.com/images/I/91V12ufIXRL._AC_UY1100_.jpg" },
    { name: 'lungi', price: 150, id: 3, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIi5nxwpFllykK36KWi37bGM_ackeZGgO7A&s" },
    { name: 'panjabi', price: 350, id: 4, img: "https://sobkisubazar.com/public/uploads/all/99YVJMlu6OQi1WAnqyuf8IzmOPBCySQaKTzE9ZHA.jpg" },

]


app.get('/products', (req, res) => {
    res.send(productsList)
})

//specific product search by id == route
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const searchProduct = productsList.find(product => product.id === parseInt(id)) || {}
    res.send(searchProduct)
    console.log(searchProduct);

})




app.listen(port, () => {
    console.log(`our server run on ${port}`);

})