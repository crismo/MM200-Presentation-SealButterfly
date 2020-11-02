const authenticator = (req, res,next) => {

    console.log(req.headers.authorization);
}

    /*if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const user = authenticate(username, password)
    if (user) {
        return res.status(403).end()
    }
    next();


}





function authenticate(username, password){
    console.log(username + ":" + password);
};
*/


module.exports = authenticator