
    //*****Start of Importing Packages******//
    const express = require('express');
    const app = express();
    const hbs = require('hbs');
    const path = require('path');
    const {databaseConnection} =  require("./database/connection");
    const port = process.env.PORT || 3000;
    const passport = require('passport');
    const expressSession = require('express-session');
    //*****End of Importing Packages******//

    //***DatabaseConnection****//
    databaseConnection();

    //****Passport Initializing******//
    app.use(expressSession({
        secret:"arsolangi",
        resave:false,
        saveUninitialized:false
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    
    //****Start of UrlEncoded BodyParing*****//
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    //****End of UrlEncoded BodyParing******//

    //****Start of Set Paths******// 
    const publicPath = path.join(__dirname,"../public");   
    app.use(express.static(publicPath));
    //***End of Set Paths******//

    //***Start of Setting View Paths*******//
    const viewPath   = path.join(__dirname,"../templates/views");
    const partialPath = path.join(__dirname,"../templates/partials");
    //***End of Setting View Paths*****//

    //****Start of Setting View Engine*****//
    app.set("views",viewPath);
    app.set("view engine","hbs");
    hbs.registerPartials(partialPath);
    //****End of Setting View Engine*****//

    //****Start of Importing Routes******//
    const webRoutes = require("./routes/web");
    //****End of Importing Routes******//


    //****Start of Setting Routes*****//
    app.use("/",webRoutes);
    //***End of Setting Routes******//

    //****Listening Port****//
    app.listen(port,()=>{
        console.log("Listening on port no - " + port);
    })
