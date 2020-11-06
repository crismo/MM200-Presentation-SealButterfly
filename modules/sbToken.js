const crypto = require('crypto');
const { resolveTxt } = require('dns');
const { stringify } = require('querystring');
const secret = process.env.hashSecret || require("../localenv").hashSecret;

class token{

    async decryptToken(token){

        //crypto.privateEncrypt(privateKey, token)

        //return tokenText;

    }

    async createAndEncryptToken(username){

            let tokenKey = "";
        
            for(let i = 0; i < 15; i++){
                tokenKey += Math.floor(Math.random() * 9) + 1;
            }
            const position = Math.floor(Math.random() * tokenKey.length) + 1;

            const tokenOutput = [tokenKey.slice(0, position), username, tokenKey.slice(position)].join('');

            /*
            let token = crypto.createHmac("sha256", secret) //krypteringsmetoden og "secret" (hashSecret) blir slått sammmen
            .update(tokenOutput) //krypterer tokenOutput med sha256+secret
            .digest("hex");
            */
        
            return tokenOutput;

    }
}

module.exports = token;