const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;

class StorageHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    async insertUser(username, password){
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT username from "users" where username=$1', [username]);
            
            const nameCheck = results.rows.find(element => element = username);
            
            if(nameCheck !== undefined){
                results = "User already exists";
                return results;
            }else{
                results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
                results = results.rows[0];
                return results;
            }
            
        }catch(err){
            results = err;
            console.log(err);
        }

        return;
    }

    async loginUser(username, password){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            
            await client.connect();
           // results = await client.query("SELECT * FROM users WHERE username=$1 AND password=$2", [username, password]);
            //console.log(results.rows);

            
            
            results = await client.query("SELECT password FROM users WHERE username=$1 AND password=$2", [username, password]);
            if(results.rows[0] !== undefined){
                
                if(password === results.rows[0].password){

                    console.log("login");

                }else{

                    results = "Password or username does not exist";
                    return;
                    
                }
                
            }else{
                //console.log("Password or username does not exist");
            }


            
            
        }catch(err){
            console.log(err);
        }

    }

    

}

module.exports = new StorageHandler(dbCredentials);