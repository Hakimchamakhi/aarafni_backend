const mongoose=require('mongoose');

//Create a Team having this prototype:
const TeamSchema = mongoose.Schema({
    email:{
        type:String, required:true, unique:true
    },
    password:{
        type:String, required:true
    },
    username:{
        type:String , required:true, unique:true
    }
}); 

module.exports = mongoose.model('Teams',TeamSchema);