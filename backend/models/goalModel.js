const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    text:{
        type:String,
        required:[true,'please addd a textfile']
    }
},{
    timestamps:true
})

module.exports = mongoose.model('goal',goalSchema);