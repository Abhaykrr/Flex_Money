const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const productSchema =new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    payment:[
        {
            month:{
                type:String,
                trim:true,
                unique:true,
            },

            batch:{
                type:String,
                trim:true,
            },

            amount:{
                type:String,
                trim:true,
            }

        },
    ]

});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;