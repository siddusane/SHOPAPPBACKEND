const express = require('express')
const bp = require('body-parser')
const cors= require('cors')
const mongoose = require('mongoose')
const empc= require('./models/model')
const URL = "mongodb+srv://admin:admin123@cluster0.o4nwyjq.mongodb.net/gfgdb?retryWrites=true&w=majority&appName=Cluster0";
//const URL="mongodb+srv://dusanes234:sonu@27@cluster0.jz9mjlo.mongodb.net/shop-app?retryWrites=true&w=majority&appName=Cluster0";

// const URL="mongodb://dusanes234:sonu@27@ac-t7vxfju-shard-00-00.jz9mjlo.mongodb.net:27017,ac-t7vxfju-shard-00-01.jz9mjlo.mongodb.net:27017,ac-t7vxfju-shard-00-02.jz9mjlo.mongodb.net:27017/shop_app?ssl=true&replicaSet=atlas-1013u0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
var app = express()
app.use(cors())
app.use(bp.json())

app.post('/addproduct', (req, res) => {
    const user= new empc({...req.body})
    user.save().then(()=> console.log('product added'))
    res.send('product added')

})
app.get('/loaddata',async(req,res)=>{
    const users= await empc.find();
    res.send(users)
})
app.get('/loaddata/:id',async(req,res)=>{
    const uid=parseInt(req.params.id)
    const users= await empc.findById(uid);
    res.send(users)
})
const startServer = async () => {
    await mongoose.connect(URL)
    app.listen(4000, () => {
        console.log('server is ready...!');
    })
}
startServer()