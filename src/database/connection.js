
    //***Importing Package****//
    const mongoose = require('mongoose');


    //***Exporting Connection****//
    exports.databaseConnection = ()=>{
        mongoose.connect("mongodb://localhost:27017/login_registration_passport",
        {
                useNewUrlParser:true,
                useUnifiedTopology:true,
        }).then( ()=> console.log("Connection Successfull") ).catch( (error)=>{ console.log(err) } );  
    }