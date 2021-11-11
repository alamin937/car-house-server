const express = require('express')
var MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
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
    //   const homeCollection = database.collection("Home_Page_Image");
      const carsCollection = database.collection("Cars");
      const placeOrderCollection = database.collection("place_Order_information")
      const reviewCollection = database.collection("Review_Collection")
      

    // //   home page image api
    // app.get('/home', async(req,res) =>{
    //     const cursor = homeCollection.find({})
    //     const result = await cursor.toArray()
    //     res.send(result)
    //     console.log(result)
    // })
    
    // cars api
    app.get('/cars', async(req,res) =>{
        const cursor = carsCollection.find({})
        const result = await cursor.toArray()
        res.send(result)
        console.log(result)
    })

    // // find one
    app.get('/cars/:id', async(req,res) =>{
        const id = req.params.id
        const query = {_id: ObjectId(id)}
        const result = await carsCollection.findOne(query)
        res.send(result);
    })


    // place order information

    app.post('/placeorder', async(req,res) =>{
      const placeorder = req.body
      const result = await placeOrderCollection.insertOne(placeorder)
      console.log(req.body)
      console.log(result)
      res.json(result);
    })


    // get place order
    app.get('/placeorder', async(req,res) =>{
      const email = req.query.email;
      const query = {email: email}
      const cursor = placeOrderCollection.find(query)
      const result = await cursor.toArray()
      res.send(result);
    })
     
    // delete placeORder Information
      app.delete('/placeorder/:id', async(req,res) =>{
        const id = req.params.id;
        console.log('deletedid', id)
        res.json('going to delete')
      })

      // review api
      app.post('/review', async(req,res) =>{
        const review = req.body
        const result = await reviewCollection.insertOne(review)
        res.json(result)
      })

      // get review
      app.get('/review', async(req,res) =>{
        const cursor = reviewCollection.find({})
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