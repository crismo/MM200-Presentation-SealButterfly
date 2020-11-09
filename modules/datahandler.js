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

    async insertUser(username, password) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
    }

    async loginUser(username, password){
        const client = new pg.Client(this.credentials);
        let resp = {};
        let results = null;

        try{

        await client.connect();
            
        results = await client.query("SELECT password FROM users WHERE username=$1 AND password=$2", [username, password]);
        if(results.rows[0] !== undefined){

            resp.isValid = true;
            resp.username = username;

        }else{
            resp.isValid = false;
        }

        client.end();

        }catch(err){
            console.log(err);
            //results = err;
        }

        return resp;
        
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
    async insert(...params) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."$1"("username", "password") VALUES($2, $3) RETURNING *;', params);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            results = err;
        }

        return results;
    }


}

module.exports = new StorageHandler(dbCredentials);