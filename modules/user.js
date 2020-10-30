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
        console.log(this.password);
    }

    async create() {
        try{
            let response = this.username + ":" + this.password;
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

}


module.exports = User