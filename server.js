const express = require('express');
const bodyParser = require('body-parser');
const {
  Router
} = require('express');
const secureEndpoints = require("./modules/secureEndpoints");
const user = require("./modules/user");
const presentation = require("./modules/presentation");
const hemmelig = require('./modules/secureEndpoints');

const server = express();
const port = (process.env.PORT || 8080);


server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.json());
// https://expressjs.com/en/guide/routing.html
//server.use("/secure", secureEndpoints);


server.post("/user", async function (req, res) {
  const newUser = new user(req.body.username, req.body.password);
  await newUser.create();
  res.status(200).json(newUser).end();
});

server.get("/authenticate", hemmelig, async (req, res) => {

    

    //console.log(req.headers.authorization);
    
    res.redirect("/userIndex.html");

});

server.post("/presentation", async function (req, res) {

  const newPres = new presentation(req.body.presentation);
  await newPres.create();
  res.status(200).json(newPres).end();
});

server.post("/presentation/*")


/*server.get("/secure/*", async function (req, res) {

    let isValid = false;

    if(isValid === true){
        res.redirect("/secure/userIndex.html");
    }else{
        res.redirect("/");
    }

    

})*/

server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});