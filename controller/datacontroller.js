const tempdef = require('../models/tempdefmodel.js')
const excel = require('exceljs')
const { Decimal128, BSONType } = require('mongodb');
// const { Decimal128 } = require('bson');
const {PassThrough} = require('stream');

const  getdata = async (req,res) => {
    try{
        const td1 = await tempdef.find({}).sort({_id:-1}).limit(1);
        res.status(200).json(td1[0]);
    } catch(error){
        console.log('Cannot find any data');
    }
};

const getdownload = async (req, res) => {
    console.log('recieved download request at backend')
    const date = req.query.date;
    console.log(date);
    const data = await tempdef.find({ date: date }).lean();
    // console.log(`data size:${data.length}`);
    // const options = {
    //   filename: './streamed-workbook.xlsx',
    //   useStyles: true,
    //   useSharedStrings: true
    // };
    // const workbook = new excel.stream.xlsx.WorkbookWriter(options);
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Temp-Def-data');
    worksheet.state = 'visible';
    worksheet.columns = [
      { header: 'Sr no.', key: 'srno', width: 5 },
      { header: 'Name', key: 'username', width: 10 },
      { header: 'Deflection', key: 'deflection', width: 10 },
      { header: 'MLmodel', key: 'MLmodel', width: 15 },
      { header: 'Temp1', key: 'temp1', width: 10 },
      { header: 'Temp2', key: 'temp2', width: 10 },
      { header: 'Temp3', key: 'temp3', width: 10 },
      { header: 'Date', key: 'date', width: 10 },
      { header: 'Time', key: 'time', width: 10 },
    ];
  
    data.forEach((item,sr) => {
        // console.log(item);
        // console.log(item.temp1);
        // let mydeci = item.temp1;
        // let myitem = +mydeci.valueOf();
        // console.log(myitem);
        let numdeflection = item.deflection;
        let numtemp1 = item.temp1;
        let numtemp2 = item.temp2;
        let numtemp3 = item.temp3;
      worksheet.addRow({
        srno: sr+1,
        username: item.username,
        deflection: +numdeflection.valueOf(),
        MLmodel:item.MLmodel,
        temp1:+numtemp1.valueOf(),
        temp2:+numtemp2.valueOf(),
        temp3:+numtemp3.valueOf(),
        date: item.date,
        time: item.time});
    });

    // Create a pass-through stream to pipe the workbook
    const stream = new PassThrough();
    workbook.xlsx.write(stream);

    // Set the headers for the response
    res.setHeader('Content-Disposition', `attachment; filename="tempdef${date}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Pipe the workbook to the response
    stream.pipe(res);

    // const buffer = await workbook.xlsx.writeBuffer();
    // const readStream = new stream.PassThrough();
    // readStream.end(buffer);
  
    // res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.set('Content-Disposition', `attachment; filename="data${date}.xlsx"`);
  
    // readStream.pipe(res);
  };


const postdata = async (req,res) => {
    try{
        const data = req.body;
        const data2 = await tempdef.create(data);
        res.status(201).json({message:'data stored successfully'});
    } catch(error){
        res.status(400).json({message:'Unable to stored data in database'});
    }
}



const feeddata = async (req,res) => {
    try{
        const t1 = (35 + 2*Math.random()*(Math.random>5?1:-1)).toFixed(2);
        const t2 = (35 + 2*Math.random()*(Math.random>5?1:-1)).toFixed(2);
        const t3 = (35 + 2*Math.random()*(Math.random>5?1:-1)).toFixed(2);
        const td1 = await tempdef.create({temp1:t1,temp2:t2,temp3:t3});
        res.status(201).json({'message': 'data added successfully', td1});
    } catch(error){
        console.log('cannot feed data into db');
        res.status(400).json(error);
    }
}

module.exports = {getdata, getdownload, feeddata, postdata};