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


const MLoptionSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    MLselected: {
        type: String,
    }
})

module.exports = mongoose.model('MLoption', MLoptionSchema);



