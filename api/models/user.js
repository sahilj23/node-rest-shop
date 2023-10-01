const mongoose = require('mongoose') ;
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId ,
    email: { type: String ,
         required: true , 
         unique: true , 
         match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        } , // to validate that it is standard email id with standard email form as it should be like abc@cde.com else throw an error
    password: { type: String , required: true }    
});

module.exports = mongoose.model('User' , userSchema);