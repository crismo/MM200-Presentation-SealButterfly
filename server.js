const express = require("express");
const bodyParser = require("body-parser");
const server = express();
//const user = require("user");
const user = require("./modules/user");
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
  res.status(200).json(newUser).end();
  //console.log(req.body.username + ":" + req.body.password);

});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});