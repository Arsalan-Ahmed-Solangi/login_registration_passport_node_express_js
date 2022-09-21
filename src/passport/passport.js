
    //****Local Strategy****//
    const localStrategy = require('passport-local').Strategy;
    const User = require("../models/User");
    
    exports.initPassport = (passport) => {

        passport.use(new localStrategy(async (username,password,done)=>{
          
            try {
                const user = await User.findOne({username:username});

                if(!user) return done(null,false);
    
                if(user.password !== password) return done(null,false);

                return done(null,user);
            } catch (error) {
                return done(error,false);
            }

            
        }))

        passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
          
        passport.deserializeUser(function(id, done) {
             User.findById(id, function (err, user) {
                done(err, user);
            });
        });

    }

    exports.isAuth = (req,res,next)=>{
        if(req.user) return next();
        res.redirect("/login");
    }

    exports.isNotAuth = (req,res,next)=>{
        if(req.isAuthenticated()) {
            return res.redirect("/dashboard")
        }
    
         next();
    }