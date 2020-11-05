const user = require("./user");
const authenticator = async (req, res,next) => {
    

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        //return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end(); //problem siden res blir ikke lest
        return 401;
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const checkUser = new user(username, password);
    const resp = await checkUser.login(); //response
   
    //console.log(resp);

    req.user = checkUser;

    //console.log(user)
    if(!checkUser) {
        return 403;
    }
    //next();

    return resp;

}


module.exports = authenticator