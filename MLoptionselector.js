const MLoption = require('./models/mloptionmodel.js')

var MLmodelselected = 'LinearRegression'

const updateMLoptionindb = async (mymodel) => {
    try{
        await MLoption.findOneAndUpdate({username:'user1'}, {username:'user1', MLselected:mymodel})
        console.log('Successfully posted new model in DB');
    }
    catch(err){
        console.log('Cannot post the ML model data in the DB');
    }
}

const setMLmodelfromdb = async () => {
    try{
        resdata = await MLoption.find({username:'user1'}).limit(1);
        // console.log(`resdata:${resdata}`)
        MLmodelselected = resdata[0].MLselected;
        console.log('Fetched MLoption successfully')
        return;
    }
    catch(err){
        console.log('Cannot fetch MLoption from the DB');
        console.log(err);
        return;
    }
}

function setMLoption(modeldata) {
    MLmodelselected = modeldata;
    console.log(`assigned MLmodelselected=${modeldata}`);
    return;
}

function getMLoption () {
    return MLmodelselected;
}

module.exports = {updateMLoptionindb, setMLoption, setMLmodelfromdb, getMLoption}