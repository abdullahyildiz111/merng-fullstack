const User = require('../../models/User');

module.exports={
    Mutation:{
       register(_, arg, context, info){
           // TODO: Validate user data
           // TODO: makes sure user doesnt already exist
           // TODO: hash password and create an auth token
       }
    }
}