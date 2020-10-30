


class User {
    constructor(username, password) {
        this.username = username;
        this.password = password
        
    }

    async create() {
        try{
            let localPass = this.username + ":" + this.password;
            console.log(localPass);
            //localStorage.setItem('localPass', 'localPass');
        }catch(err){
            console.log(err);
        }
    }

}


module.exports = User