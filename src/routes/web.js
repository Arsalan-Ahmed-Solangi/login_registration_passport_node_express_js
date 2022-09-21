
    //***Importing Packages*****//
    const express = require('express');
    const router = express.Router();
    const User = require("../models/User");
    const passport = require('passport');   
    const {initPassport} = require("../passport/passport");
    const {isAuth} = require("../passport/passport");
    const {isNotAuth} = require("../passport/passport");
    //*****Passport Connection*******//
    initPassport(passport);

    //****Home Page*****//
    router.get("/",(req,res)=>{
        res.send("Home Page");
    })

    //***Register Page****//
    router.get("/register",(req,res)=>{
        res.render("register",{title:"Register - Page"});
    });

    //***Login Page****//
    router.get("/login",isNotAuth,(req,res)=>{
        res.render("login",{title:"Login - Page"});
    });

    //***Loging Handler*****//
    router.post("/login",passport.authenticate("local",{
        failureRedirect:"/login",
        successRedirect:'/dashboard'
    }),(req,res)=>{

    });

    //****Register Handler****//
    router.post("/register",async (req,res)=>{
        const user = await User.findOne({username:req.body.username});
        if(user) return res.status(400).send("User Already Exits");

        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
    })

    //****Dashboard Route*****//
    router.get('/dashboard',isAuth,(req,res)=>{
        res.send("You are logged in Now with user details is : " + req.user);
    });


    //***Logout****//
    router.get('/logout', function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });

    //****Exporting Router******//  
    module.exports = router;