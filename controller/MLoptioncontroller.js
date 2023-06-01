const MLoption = require('../models/mloptionmodel.js')


const  getMLselected = async (req,res) => {
    try{
        const td1 = await MLoption.findOne({username:'user1'});
        res.status(200).json(td1[0]);
    } catch(error){
        console.log('Cannot find any MLoption document with given userid');
    }
}
