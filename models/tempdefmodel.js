const mongoose = require('mongoose')

// const tdataSchema = new mongoose.Schema({
//     temp: {
//         type: mongoose.Types.Decimal128,
//         default: 35,
//     },
//     def: {
//         type: mongoose.Types.Decimal128,
//         default: 0,
//     },
// })


const tdataSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    deflection: {
        type: mongoose.Types.Decimal128,
        default: 0,
    },
    MLmodel: {
        type: String,
    },
    temp1: {
        type: mongoose.Types.Decimal128,
        default: 28,
    },
    temp2: {
        type: mongoose.Types.Decimal128,
        default: 28,
    },
    temp3: {
        type: mongoose.Types.Decimal128,
        default: 28,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    }
})

module.exports = mongoose.model('tempdef', tdataSchema);



