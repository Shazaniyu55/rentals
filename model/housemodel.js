const mongoose = require('mongoose');


const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        require: true
    },
    state: {
        type: String,
        required: true
    },
    
    
    
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    
    description: {
        type: String,
        required: true,
    },
    

    address: {
        type: String,
        required: true,
    },
    feet: {
        type: String,
        required: true,
    },

    bed: {
        type: String,
        required: true,
    },
    
    bath: {
        type: String,
        required: true,
    },

      isSold: {
        type: Boolean,
        required: true,
        default:false
    },
     userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
     },
        
    
    

}, {
    timestamps: true
});





module.exports = mongoose.model('houses', houseSchema);