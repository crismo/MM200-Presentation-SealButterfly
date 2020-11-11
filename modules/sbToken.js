const user = requier("./user.js");
const crypto = require('crypto');
const secret = process.env.tokenSecret || require("../localenv").tokenSecret;

function createToken(user){
  
  let body = {created:new Date().now(), user:JSON.stringify(user), validTo:"Dato i fremtiden"}
  
  let token  = crypto.createHmac('sha256', secret) // Bruk annen algoritme 
            .update(body)
            .digest('hex');
  
    return token;
}

function validateToken(token, user){

    // omvendt av det som ligger i createToken?
    // er token info === user info
    // Er tokenet utløpt??
}


module.exports.create = createToken;
module.exports.validate = validateToken;
