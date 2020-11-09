const database = require('./datahandler');
const user = require('./user');

const authenticator = async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        //return res.redirect("/"); //returnerer til index.html hvis brukeren ikke er logget inn
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end();
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const user = await authenticate(username, password);
    if (!user.isValid) {
        return res.status(403).end();
    }
    next();
}

async function authenticate(username, password) {
    
    const loginUser = new user(username, password);

    const resp = await loginUser.login();
    console.log(resp)
    //console.log(resp); // true/false
    return resp;
}


module.exports = authenticator