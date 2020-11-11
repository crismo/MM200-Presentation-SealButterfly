const express = require('express');
const bodyParser = require('body-parser');
const user = require("./modules/user");
const auth = require("./modules/auth");

const createToken = require("./modules/sbToken").create;

const server = express();
const port = (process.env.PORT || 8080);
server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.json());


// create new user
server.post("/user", async function (req, res) {
  const newUser = new user(req.body.username, req.body.password);
  await newUser.create();
  // Hva om databasen feilet?
  // Hva om det var en bruker med samme brukernavn?
  res.status(200).json(newUser).end();
});

server.post("/authenticate", async (req, res) => {
  
  let requestUser = new user(req.body.username, req.body.password); // Hvem prøver å logge inn?
  let isValid = requestUser.validate(); // Finnes vedkommende i DB og er det riktig passord?
  
  if(isValid){
    let sessionToken = createToken(requestUser);
    res.status(200).json({"authToken":sessionToken}).end();
  } else {
    res.status(403).end(); 
  }
  
});

//!!!! WARNING DEMO !!! 
server.get("/user/presentation/:id",auth, function (req, res) {

    // Bruker spør om presentasjon med id.
    // Tilhører den presentasjonen denne brukeren?
    // if(req.user.id = presenteasjon.author){}
    // req.user kommer fra auth. 
    
    // Retuner json for presentasjon. 

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
