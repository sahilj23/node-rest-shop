const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  

const User = require('../models/user') ; 

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1) { // if user email id already exists, dont create double entry for the same, instead return error that it exists
         return res.status(409).json({
          message: 'Mail exists'
         });
      }  else{
        bcrypt.hash(req.body.password , 10 , (err, hash) =>{  // salting 10 i.e. adding 10 random characters to the hash version of password so that it can't be simply converted back to the original password by translating the exact hash of the password
          if(err) {
              return res.status(500).json({
                  error: err
              });
          } else {
              
      const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email  ,
          password: hash  ,
        });
        user
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
              message: 'User created'
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
        });
      }
    }); 
      }
    })
    
      
  
  }

  exports.user_login = (req , res , next) => {
    User.find({ email: req.body.email })
     .exec()
     .then(user => {
         if(user.length < 1){  //got no user
            return res.status(404).json({
              message: 'Auth failed'
            })
         }
         // to check the hash password with the plain text password user entered, we use bcrypt.compare(plain text pw, hash pw, function(err, cb))
  
         bcrypt.compare(req.body.password, user[0].password, (err, result)=>{ 
                 if(err){
                  return res.status(401).json({
                    message: 'Auth failed'
                  });
                 }
                 if(result){
                  const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                  }, 
                  process.env.JWT_KEY ,
                  {
                    expiresIn: '1h'
                  } 
                   );
                    return res.status(200).json({
                      message: 'Auth successful' ,
                      token: token
                    });
                 }
                 res.status(401).json({
                  message: 'Auth failed'
                 });
         });
  
     })
     .catch( err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
    });
  }

  exports.user_delete = (req , res , next ) => {
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {x
       console.log(err);
       res.status(500).json({
        error: err
       });
    });
}