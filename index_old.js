const express = require('express')
const app = express();
const connectdb = require('./db/connect.js')
const router = require('./router/routes.js')

const port = 5000 || 8000;

app.use('/api/v1/',router);

const start = async ()=> {
    try{
        await connectdb('mongodb://localhost:27017/iotddp');
        app.listen(port, ()=> {
            console.log(`Server is listening on port: ${port}...`);
        })
    }catch (error){
        console.log(error);
    }
}

start();