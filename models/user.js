const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema =new mongoose.Schema({

    name:{
        type:String,
        trim:true,
    },
    username:{
        type:String,
        trim:true,
    },
    age:{
         type:String,
         trim:true,
       },
    email:{
        type:String,
        trim:true,
    },
    batch:{
         type:String,
         trim:true,
       },
    enrolled:{
        type:String,
        trim:true,
    }   

});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);
module.exports = User;