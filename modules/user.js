const crypto = require('crypto');
const database = require('./datahandler');
const secret = process.env.hashSecret || require("../localenv").hashSecret;


class User {
    constructor(username, password) {
        this.username = username;
        this.password = crypto.createHmac("sha256", secret) //krypteringsmetoden og "secret" (hashSecret) blir slått sammmen
            .update(password) //krypterer passordet brukeren sendte inn med sha256+secret
            .digest("hex");
        //this.valid = false;
        //krypterer passord
        //console.log(this.password);
    }

    async create() {
        try{
            let resp = await database.insertUser(this.username, this.password);
            return resp;
        }catch(err){
            console.log(err);
        }
    }

    async login(){
        try{
            let resp = await database.loginUser(this.username, this.password);
            //console.log(resp)
            return resp;
        }catch(err){
            console.log(err);
        }
    }

}


module.exports = User