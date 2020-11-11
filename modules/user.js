const database = require("./datahandler")
const crypto = require('crypto');
const secret = process.env.hashSecret || require("../localenv").hashSecret;
/*
const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
*/
class User {
    constructor(username, password) {
        this.username = username;
        this.password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        this.isValid = false;
        this.email = null;
    }

    async create() {
        try {
            let respons = await database.insertUser(this.username, this.password);
        } catch (error) {
            console.error(error)
        }
    }
  
  async update(){
  
  }

  async delete(){
    //??? Vanskelig :) pga politikk. 
  }

    async validate(){
      let success = false;
      try{
            let resp = await database.loginUser(this.username, this.password);

            if(resp != null){
              this.isValid = true;
              sucess = true
              // Her kan vi populere andre felter i user objektet
              // Eks this.email = resp.email (eller lignende)
            }
        }catch(err){
            console.log(err);
        }
      return success;
    }

}


module.exports = User
