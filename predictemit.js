const childprocess = require('child_process');
const {io} = require('./serversocket.js')
const tempdef = require('./models/tempdefmodel.js')
const {getMLoption} = require('./MLoptionselector.js')



const PredictEmit = (temp1, temp2, temp3)=> {
    const spawn = childprocess.spawn;
    let modelname = getMLoption();
//     console.log(modelname);
    const process = spawn('python', ['./temp.py',temp1,temp2,temp3,modelname]);
    let mypredict;
    process.stdout.on('data', async (data)=> {
        // console.log(data);
        mypredict = (Number(new TextDecoder().decode(data))).toFixed(4);
        // console.log(mypredict)
        let today = new Date();
        let mydate= (today.getDate())+"-"+(today.getMonth()+1)+"-"+(today.getFullYear());
        let mytime= (today.getHours())+":"+(today.getMinutes())+":"+(today.getSeconds());
        let td_data = {username:'user1',deflection: mypredict, MLmodel:modelname, temp1, temp2, temp3, date: mydate, time : mytime};
        // console.log(td_data);
            io.sockets.emit('deflection_data', td_data);
        
        try{
            let sentdata = await tempdef.create(td_data);
//             console.log(`data sent successfully : ${td_data}`);
        } catch{
            console.log('Unable to send data to database');
        }
    })
}

module.exports =  {PredictEmit};
