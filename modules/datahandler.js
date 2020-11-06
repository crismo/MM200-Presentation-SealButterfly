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
                client.end();
                return results;
            }else{
                results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
                //results = results.rows[0];
                //console.log(results);
                results = 200; //User created!, 200
                client.end();
                return results;
            }
            
        }catch(err){
            client.end();
            console.log(err);
        }

        //return 403;
    }

    async loginUser(username, password){
        const client = new pg.Client(this.credentials);
        let results = null;

        try{
            
            await client.connect();
            
            results = await client.query("SELECT password FROM users WHERE username=$1 AND password=$2", [username, password]);
            if(results.rows[0] !== undefined){
                
                if(password === results.rows[0].password){

                    //const idResults = await client.query('SELECT id from "users" where username=$1', [username]);
                    //const payload = {id: idResults.rows[0].id};//{id: result[0].id};
                    //const secret = "JosteinNordengen";


                    function tokenGenerator (username) {

                        let tokenKey = "";
                    
                        for(let i = 0; i < 15; i++){
                            tokenKey += Math.floor(Math.random() * 9) + 1;
                        }
                        const position = Math.floor(Math.random() * tokenKey.length) + 1;

                        const tokenOutput = [tokenKey.slice(0, position), username, tokenKey.slice(position)].join('');
                    
                        return tokenOutput;
                    
                    }

                    const token = tokenGenerator(username);
                    //console.log(token);

                    results = {"status": 200, "token": token}; //login successful, 200

                    //console.log(results.token)
                    client.end();
                    return results;

                }else{

                    results.status = 401; //Password or username is incorrect, 401 unauthorized
                    client.end();
                    return results;
                    
                }
                
            }else{
                results.status = 401; //Password or username is incorrect, 401 unauthorized
                client.end();
                return results;
            }
            
        }catch(err){
            client.end();
            console.log(err);
        }

    }

    

}

module.exports = new StorageHandler(dbCredentials);