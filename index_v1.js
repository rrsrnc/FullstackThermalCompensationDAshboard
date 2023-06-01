const express = require('express')
const http = require('http');
const {Server} = require("socket.io");
const cors = require("cors");
const app = express();
const connectdb = require('./db/connect.js')
const router = require('./router/routes.js')

app.use(cors());

// app.use('/', express.static( path.join(__dirname, "/node_modules/socket.io/client-dist")));

const server = http.createServer(app);

const io = new Server(server, { //Bind socket.io to our express server.
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST"],
    },
    path: "/socket.io/client-dist",
});

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`); //show a log as a new client connects.
})

const port = 5000 || 8000;

app.use('/api/v1/',router);

const start = async ()=> {
    try{
        await connectdb('mongodb://localhost:27017/iotddp');
        app.listen(port, ()=> {
            console.log(`Server is listening on port: ${port}...`);
            // setInterval(()=>{
            //     var today = new Date();
            //     // console.log(today);
            //     let mytime = {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes())};
            //     console.log(mytime);
            //     io.sockets.emit('timestamp', mytime); //emit the datd i.e. {date, time, temp} to all the connected clients.
            // },1000)
        });
    }catch (error){
        console.log(error);
    }
}

start();
