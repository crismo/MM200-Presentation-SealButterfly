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
                results = 401; //Username is already taken!, 401
                return results;
            }else{
                results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
                //results = results.rows[0];
                //console.log(results);
                results = 200; //User created!, 200
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
            
            results = await client.query("SELECT password FROM users WHERE username=$1 AND password=$2", [username, password]);
            if(results.rows[0] !== undefined){
                
                if(password === results.rows[0].password){

                    results = 200; //login successful, 200
                    return results;

                }else{

                    results = 401; //Password or username is incorrect, 401 unauthorized
                    return results;
                    
                }
                
            }else{
                results = 401; //Password or username is incorrect, 401 unauthorized
                return results;
            }
            
        }catch(err){
            console.log(err);
        }

    }

    

}

module.exports = new StorageHandler(dbCredentials);