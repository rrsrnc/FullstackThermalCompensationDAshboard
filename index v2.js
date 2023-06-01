const app = require('express')();
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app);
const cors = require('cors');
const SerialPort = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter');
const {PredictEmit} = require('./predictemit.js')
// console.log(SerialPort);

const childprocess = require('child_process')


const connectdb = require('./db/connect.js')
const router = require('./router/routes.js')


const port = 5000;

app.use(cors());

app.use('/api/v1/',router);


const io = new Server(server, {
  cors:{
    origin:"http://localhost:3000",
    method: ["GET","POST"],
  }
});

console.log(io);
app.get("/", (req, res) => {
  res.sendFile("Hellow");
});

io.on('connection', (socket) => {
  console.log(`User connected : ${socket.id}`);
});

// const PredictEmit = (temp1, temp2, temp3, temp4)=> {
//     const spawn = childprocess.spawn;
//     // const process = spawn('node', './temp.js');
//     const process = spawn('python', ['./temp.py',temp1,temp2,temp3,temp4]);
//     let mydata;
//     process.stdout.on('data', (data)=> {
//         // console.log(data);
//         mydata = new TextDecoder().decode(data);
//         console.log(mydata)
//         io.sockets.emit('deflection_data', mydata);
//         // console.log(`data logged : ${mydata}`);
//     })
//     // console.log('process over');
// }

const start = async ()=> {
    try{
        await connectdb('mongodb://localhost:27017/iotddp');
        server.listen(port, ()=> {
            console.log(`Server is listening on port: ${port}...`);
            setInterval(()=>{
                let today = new Date();
                // console.log(today);
                let temp1 = 28 + 3*Math.random()*(Math.random()>0.5 ? 1: -1);
                let temp2 = 28 + 3*Math.random()*(Math.random()>0.5 ? 1: -1);
                let temp3 = 28 + 3*Math.random()*(Math.random()>0.5 ? 1: -1);
                let temp4 = 28 + 3*Math.random()*(Math.random()>0.5 ? 1: -1);
                // let mydata = {tempdata: {temp1, temp2, temp3, temp4}, timestamp : {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes())+":"+(today.getSeconds())}};
                // console.log(mydata);
                PredictEmit(temp1,temp2,temp3,temp4);
                // io.sockets.emit('td_data', mydata); //emit the datd i.e. {date, time, temp} to all the connected clients.
            },2000)
        });
    }catch (error){
        console.log(error);
    }
}

start();

// const S_port = new SerialPort.SerialPort({path:'COM3', baudRate:115200}, false); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3.
// const parser = S_port.pipe(new DelimiterParser({delimiter: '\r\n'})); //Read the line only when new line comes.
// parser.on('data', (temp) => { //Read data
//     if(temp==="X"){
//         return;
//     }
//     let str1 = new TextDecoder().decode(temp);
//     // if(str1[str1.length-1]==='\r'){
//     //         str1.substring(0,str1.length-1);
//     // }
//     let tdata = str1.split("|");
//     let today = new Date();
//     // console.log(today);
//     let temp1 = tdata[0];
//     let temp2 = tdata[1];
//     let temp3 = tdata[2];
//     let temp4 = tdata[3];
//     let mydata = {tempdata: {temp1, temp2, temp3, temp4}, timestamp : {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes())+":"+(today.getSeconds())}};
//     console.log(mydata);
//     PredictEmit(temp1,temp2,temp3,temp4);
//     io.sockets.emit('td_data', mydata);
//     console.log(str1);
//     console.log(tdata);
//     // console.log(`temp1 = ${tdata[0]}, temp2=${tdata[1]}, temp3=${tdata[2]}, temp4=${tdata[3]} \n`); 
// });
module.exports = {io}