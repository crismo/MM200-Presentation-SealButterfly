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
  let max = 20;
  const resp = {};
  let statusCode = "";

  if(req.body.username.length < max && req.body.password.length < max){
    const newUser = new user(req.body.username, req.body.password); //lager en ny user, med brukernavn og passord som clienten har sendt inn
    statusCode = await newUser.create(); //returnerer en http statuskode
  }else{
    statusCode = 403;
  }

  //her sjekker den hvilken statuskode som ble returnert, slik at resp kan få riktig verdi
  switch(statusCode){
    case 200:
      resp.response = "User created!";
      break;
    case 401:
      resp.response = "Username is already taken!";
      break;
    case 403:
      resp.response = `Username or password is exceeding ${max} characters`;
      break;
    default:
      statusCode = 400;
      resp.response = "Something went wrong!";
      break;
  }

  res.status(statusCode).json(resp).end();
  //Returnerer riktig statuskode og beskjed til brukeren

});


//når clientet fetcher med get /user kommer man hit
server.get("/user", async function (req, res){
  //kryptert brukernavn og passord blir sendt inn hit fra index.html
  const checkUser = await authenticator(req); //returnerer en http statuskode
  //console.log(checkUser.status)
  const resp = {};
  let status = checkUser.status;
  const token = checkUser.token;

  let JSONuser = {"username": }

  //her sjekker den hvilken statuskode som ble returnert, slik at resp kan få riktig verdi
  switch(status){
    case 200:
      resp.response = "Login successful";
      resp.token = token;
      break;
    case 401:
      resp.response = "Password or username is incorrect";
      break;
    case 403:
      resp.response = "Forbidden!";
      break;
    default:
      status = 400;
      resp.response = "Something went wrong!";
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