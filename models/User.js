const mongoose=require('mongoose');

//Create a User having this prototype:
const UserSchema = mongoose.Schema({
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

module.exports = mongoose.model('Users',UserSchema);