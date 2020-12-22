const{model,Schema} = require('mongoose');

const userSchema = new Schema({
    
    username:String,
    gender:String,
    password:String,
    email:String,
    createdAt:String,
   
});

module.exports =model('User',userSchema);