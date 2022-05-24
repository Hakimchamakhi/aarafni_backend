const mongoose=require('mongoose');

//Create a Comment having this prototype:
const CommentSchema = mongoose.Schema({
    project_id:{
        type:String, required:true, unique:true
    },
    comments:{
        type:Array, required:false
    }
}); 

module.exports = mongoose.model('Comments',CommentSchema);