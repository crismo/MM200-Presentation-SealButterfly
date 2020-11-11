const user = require("./user");
const validateToken = require("./sbToken").validate;

const authenticator = async (req, res,next) => {

    if(req.body.token != undefined){ // Altså har klient sendt med en verdi for et felt token?       
        if(validateToken(req.body.token)){ // dersom token er gyldig
            
            // på dette tidspunktet så kan vi pakke ut token og lage user objekt. 
            // let username = token.username;
            // let psw = token.password;
            // ......
            // req.user = user(username,psw);
            
            next();
        }
    } 

    res.status(403).end();
}


module.exports = authenticator
