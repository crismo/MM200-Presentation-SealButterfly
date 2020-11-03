const user = require("./user");
const authenticator = (req, res,next) => {
    

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
    }

    const credentials = req.headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const user = authenticate(username, password);
    console.log(user);

    //console.log(user)
    /*if(user) {
        return res.status(403).end()
    }*/
    //next();

    //return user;

}


function authenticate(username, password){
    //console.log(username + ":" + password);
    const checkUser = new user(username, password);
    let resp = "test";
    test();
    async function test(){
    resp = await checkUser.login();
    //console.log(resp);
    return resp;
    }
    //resp = "test";
    
};


module.exports = authenticator