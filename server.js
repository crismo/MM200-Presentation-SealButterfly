const express = require("express");
const bodyParser = require("body-parser");
const server = express();

const user = require("./modules/user");
const authenticator = require("./modules/auth");
const { loginUser } = require("./modules/datahandler");
const port = (process.env.PORT || 8080);

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

//når clientet fetcher med post /user kommer man hit
server.post("/user", async function (req, res){
  const newUser = new user(req.body.username, req.body.password); //lager en ny user, med brukernavn og passord som clienten har sendt inn
  const statusCode = await newUser.create(); //returnerer en http statuskode
  let resp = "";

  //her sjekker den hvilken statuskode som ble returnert, slik at resp kan få riktig verdi
  switch(statusCode){
    case 200:
      resp = "User created!";
      break;
    case 401:
      resp = "Username is already taken!";
      break;
    default:
      checkUser = 400;
      resp = "Something went wrong!";
      break;
  }

  res.status(statusCode).json(resp).end();
  //Returnerer riktig statuskode og beskjed til brukeren

});


//når clientet fetcher med get /user kommer man hit
server.get("/user", async function (req, res){
  //kryptert brukernavn og passord blir sendt inn hit fra index.html
  let checkUser = await authenticator(req); //returnerer en http statuskode
  //console.log(checkUser.status)
  let resp = "";
  const status = checkUser.status;
  const token = checkUser.token;

  //her sjekker den hvilken statuskode som ble returnert, slik at resp kan få riktig verdi
  switch(status){
    case 200:
      const msg = "Login successful";
      resp = {"response": msg, "token": token}
      break;
    case 401:
      resp = "Password or username is incorrect";
      break;
    case 403:
      resp = "Forbidden!";
      break;
    default:
      checkUser = 400;
      resp = "Something went wrong!";
      break;
  }
  
  //res.redirect(200, '/userIndex.html');
  res.status(status).json(resp).end();
  //Returnerer riktig statuskode og beskjed til brukeren

});

//server.get("*", (req, res) => { //redirecter til index.html hvis feks linken er /test eller noe som ikke finnes
  //res.redirect('/');
//});


server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});