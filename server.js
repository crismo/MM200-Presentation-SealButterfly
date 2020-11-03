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

server.get("/test", (req,res,next)=>{

  res.status(200).send("Hello World").end();

});

//når clientet fetcher /user kommer man hit
server.post("/user", async function (req, res){
  const newUser = new user(req.body.username, req.body.password);
  await newUser.create();
  res.status(200).json("response").end();
  //console.log(req.body.username + ":" + req.body.password);
});

server.get("/user", async function (req, res){
  //console.log(req.headers.authorization)
  const checkUser = await authenticator(req);
  //console.log(checkUser)

  
  res.status(200).json("response").end();
  
  //const checkUser = new user(username, password);
  //await checkUser.login();
  //console.log(checkUser);
  //await checkUser.login();

});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});