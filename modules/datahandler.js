const pg = require("pq");
const dbCredentials = process.env.DATABASE_URL || require("../localenv");

class StorageHandler {

    constructor(credentials){
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejection: false
            }
        }
    }

    async insertUser(username, password){
        console.log("insertUser");
    }

}

module.exports = StorageHandler