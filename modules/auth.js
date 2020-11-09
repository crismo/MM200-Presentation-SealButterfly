const database = require('./datahandler');

const authenticator = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end();
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const user = authenticate(username, password);
    if (user === false) {
        return res.status(403).end();
    }
    next();
}

async function authenticate(username, password) {

    let isValid = await database.loginUser(username, password);
    console.log(isValid);
    //return username === "test" && password === "aaa";
    return isValid;
}


module.exports = authenticator