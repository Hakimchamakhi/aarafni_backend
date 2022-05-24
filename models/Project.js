const mongoose=require('mongoose');

//Create a Project having this prototype:
const ProjectSchema = mongoose.Schema({
    title:{
        type:String, required:true, unique:true
    },
    client:{
        type:String, required:true
    },
    description:{
        type:String , required:true
    },
    notdone:{
        type:Array, required:false
    },
    inprogress:{
        type:Array, required:false
    },
    done:{
        type:Array, required:false
    }
}); 

module.exports = mongoose.model('Projects',ProjectSchema);