const app = require('express')();
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app);
const cors = require('cors');
const {updateMLoptionindb, setMLoption} = require('./MLoptionselector.js')



app.use(cors());

// Add the CORS middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://rrsrnc.github.io');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const io = new Server(server, {
    cors:{
        // origin:"http://3.222.121.208",
        // origin:"http://localhost:3000",
        origin:"https://rrsrnc.github.io",
        method: ["GET","POST"],
        allowedHeaders: ["https://rrsrnc.github.io"],
        credentials: true
    },
    path:"/socket.io",
   
});

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);
    socket.on("model_data", (modelname)=> {
        updateMLoptionindb(modelname);
        setMLoption(modelname);
    })
});


module.exports = {server, app, io}