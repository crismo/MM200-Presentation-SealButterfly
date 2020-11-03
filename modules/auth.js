const user = require("./user");
const authenticator = async (req, res,next) => {
    

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const checkUser = new user(username, password);
    const resp = await checkUser.login(); //response
   
    //console.log(resp);

    return resp;

    //console.log(user)
    /*if(user) {
        return res.status(403).end()
    }*/
    //next();

    //return user;

}


module.exports = authenticator