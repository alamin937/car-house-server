const express = require('express')
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
require('dotenv').config()
const app = express()

// middleware

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000






var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.bzphb.mongodb.net:27017,cluster0-shard-00-01.bzphb.mongodb.net:27017,cluster0-shard-00-02.bzphb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rs3vfq-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("CarsHouse");
      const homeCollection = database.collection("Home_Page_Image");
      

    //   home page image api
    app.get('/home', async(req,res) =>{
        const cursor = homeCollection.find({})
        const result = await cursor.toArray()
        res.send(result)
        console.log(result)
    })





    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('Hello World')
})


app.listen(port, () =>{
    console.log('running port', port)
})