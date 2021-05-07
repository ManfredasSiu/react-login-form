require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { createPool } = require('mysql');
var mailCon = require('./MailController.ts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var utils = require('./utils');
const saltRounds = 10;



const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next(); 
 
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; 
      next();
    }
  });
});

const pool = createPool({
    user: "root",
    password: "password",
    host: "localhost",
    database: "userdb"
})

const getAllUserData = () => pool.query(`select * from users`, (err, result, fields) => {
  if(err){
    return console.log(err);
  }
  return console.log(result);
})

app.get('/api/resetpwemail', (req, res) => {
  pool.query(`select * from users where name = '${req.query.email}'`, (err, result) => {
    if(err)
    {
      console.log(err);
      return;
    }
    if(result.length > 0)
    {
      const userdata = {
        Email: req.query.email,
        Purpose: req.query.purpose
      };
      const token = utils.generateResetToken(userdata);
      mailCon.sendResetMail(userdata.Email, token, userdata.Purpose);
    }
  });
});

app.post('/api/register', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const password = req.body.password;
    console.log(password);
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if(err == null){
        console.log(hash);
        pool.query("insert into users(name, password) values (?,?)", [name, hash], (err, result) => {
          if(err != null)
            return res.json({success: false});
          else 
          {
            return res.json({success: true});
          }
        })
      }
      else
        return res.json({success: false});
    });
  });

  app.post('/api/login', async (req, res) => {
    pool.query("select * from users where name = '" +  [req.body.name] + "'", (err, result) => {
      if(result.length > 0){
        const userdata = {
          username: result[0].Name,
          password: result[0].Password
        };
        console.log(userdata);
        bcrypt.compare(req.body.password, userdata.password, function(err, result) {
        if(err == null)
        {
          if (result)
          {
            const token = utils.generateToken(userdata);

            return res.json({ user: userdata.username, token: token, success: true});
          }
          else
          {
            return res.json({ user: 0, token: 0, success: false});
          }
        }
        else
          return res.json({ user: 0, token: 0, success: false});
        });
      }
      else return res.json({ user: 0, token: 0, success: false});
    });
  });

  app.post('/api/updatepassword', (req, res) => {
    console.log("test");
    var token = req.body.token;
    var newPass = req.body.password;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
      console.log(data, err);
      if ((err != null) || (data.Purpose != 'reset')) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
      else{
        console.log("test");
        bcrypt.hash(newPass, saltRounds, function(err, hash) {
          if(err == null){
            console.log(hash);
            pool.query(`UPDATE users set password='${hash}' WHERE name ='${data.Email}'`, (err, result) => {
              if(err != null)
              {
                mailCon.sendMail(data.Email, "Slaptažodis nepakeistas", "Slaptažodžio pakeisti nepavyko, bandykite dar kartą.");
                return res.json({error: true, success: false});
              }
              else 
              {
                mailCon.sendMail(data.Email, "Slaptažodis pakeistas", "Slaptažodis buvo sėkmingai pakeistas, sėkmės.");
                return res.json({error: false, success: true});
              }
            })
          }
          else
          {
            mailCon.sendMail(data.Email, "Slaptažodis nepakeistas", "Slaptažodžio pakeisti nepavyko, bandykite dar kartą.");
            return res.json({error: true, success: false});
          }
        });;
      }
    });
  });

  app.get('/api/verifyresetToken', (req, res) => {
    var token = req.body.token || req.query.token;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
      if ((err != null) || (data.Purpose != "reset")) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
      else{
         return res.json({success: true, error: false});
      }
    });
  })

  app.get('/api/verifytoken', function (req, res) {
    var token = req.body.token || req.query.token;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      console.log(user);
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
   
      pool.query("select * from users where name = '" +  [user.username] + "'", (err, result) => {
        if(result.length > 0){
          return res.json({ user: result[0].Name, token: token, success: true, error: false, message: "User verified"});
        }
        return res.status(400).json({
          error: true,
          message: "User name not found."
        });
      });
    });
  });


app.listen(port, () => console.log(`Listening on port ${port}`));
