//**

const express = require('express');

const dbHandler = require("./dbhandler");

const global = require('./global');

const bcrypt = require('bcrypt');

let jwt = require('jsonwebtoken');

const router = express.Router();

 

// andre endepunkter...

//...

 

// login -------------------------------------------------

 

router.post('/auth/', async function (req, res) {



    try {



        let email = req.body.email;

        let psw = req.body.psw;



        if (!email || !psw) {

            res.status(500).json({err: "SRV01", msg: "Missing valid user data"});

            return;

        }



        let result = await dbHandler.getUserPsw(email);

 

        if (result.length == 0) {

            res.status(401).json({err: "AUTH03", msg: "User doesn't exist."});

        }

        else {

            let check = bcrypt.compareSync(psw, result[0].psw);

            if (check) {



            //lager token ---------------------

                let payload = {id: result[0].id};

                let tok = jwt.sign(payload, global.secret, {expiresIn: "12h"});

                let downdata = {

                    email: result[0].email,

                    avatar: result[0].avatar,

                    token: tok

                }

                res.status(200).json(downdata);

            }

            else {

                res.status(401).json({err: "AUTH04", msg: "Wrong password."});

            }

        }

    }

    catch(err) {

        res.status(500).json({err: "SRV00", msg: "Server error", dscr: err.message});

    }

});

 

//**