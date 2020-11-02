const crypto = require('crypto');
const database = require('./datahandler');
const secret = process.env.hashSecret || require("../localenv").hashSecret;


class User {
    constructor(username, password) {
        this.username = username;
        this.password = crypto.createHmac("sha256", secret)
            .update(password)
            .digest("hex");
        //kryptere passord
        //console.log(this.password);
    }

    async create() {
        try{
            let resp = await database.insertUser(this.username, this.password);
            //console.log(resp);
            return resp;
        }catch(err){
            console.log(err);
        }
    }

}


module.exports = User