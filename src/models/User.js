
    //***Importing Package****//
    const mongoose = require('mongoose');

    const userSchema = mongoose.Schema({

        name : {
            type:String,
            required:true
        },
        username : {
            type:String,
            required:true,
            unique:true
        },

        password : {
            type:String,
            required:true
        }
    });


    //***Exporting Model***//
    module.exports = mongoose.model("user",userSchema);
