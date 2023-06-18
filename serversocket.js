const app = require('express')();
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app);
const cors = require('cors');
const {updateMLoptionindb, setMLoption} = require('./MLoptionselector.js')



app.use(cors());

const io = new Server(server, {
    cors:{
        // origin:"http://3.222.121.208",
        // origin:"http://localhost:3000",
        origin:"https://rrsrnc.github.io",
        method: ["GET","POST"],
        headers: {
            "Access-Control-Allow-Origin": "https://rrsrnc.github.io"
          }
    }
   
});

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);
    socket.on("model_data", (modelname)=> {
        updateMLoptionindb(modelname);
        setMLoption(modelname);
    })
});


module.exports = {server, app, io}