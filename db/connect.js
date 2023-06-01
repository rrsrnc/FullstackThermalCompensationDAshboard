const mongoose =  require('mongoose')

const connectdb = (url) => {
    return mongoose.connect(url);
} 
module.exports = connectdb;