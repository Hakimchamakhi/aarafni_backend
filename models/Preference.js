const mongoose=require('mongoose');

//Create a Preference having this prototype:
const PreferenceSchema = mongoose.Schema({
    client_id:{
        type:String, required:true, unique:true
    },
    client_username:{
        type:String, required:true, unique:true
    },
    colors:{
        type:String
    },
    songs:{
        type:String
    },
    birthdate:{
        type:String
    },
    foods:{
        type:String
    },
    hobbies:{
        type:String
    },
    wordstosay:{
        type:String
    },
    gender:{
        type:String
    }
}); 

module.exports = mongoose.model('Preferences',PreferenceSchema);