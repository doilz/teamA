const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

const fs = require("fs")
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const db = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});


exports.login = (req, res) => {
    try {
        const { email, userpwd } = req.body;

        if(!email || !userpwd) {
            return res.send({
                message: 'Please provide email and password'
            });   
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {

            if( !results || !(await bcrypt.compare(userpwd, results[0].userpwd) ) ) {
                console.log(results);
                res.send({
                    message: 'email or password is incorrect.'
                    
                });
            } else {
                const userid = results[0].userid
                const token = jwt.sign({userid: userid}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log('The token is: ' + token);

                const cookieOption = {
                    expiresIn: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                 res.cookie('jwt', token, cookieOption);
                 res.status(200).redirect("/");
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.signup = (req, res) => {
        console.log(req.body);
        const { userid, email,gender, phoneNumber, userpwd, pwdConfirm, termsAndConditions } = req.body;

        db.query('SELECT email from users WHERE email = ?', [email], async (err, results) =>{
            if(err) throw err;

            if(results > 0) {
                // return res.render('signup', {
                //     message : 'That email is already in use'
                // });
                return res.send({
                    message : 'That email is already in use'
                });
            } else if( userpwd !== pwdConfirm) {
                // return res.render('signup', {
                //     message: 'Password do not match'
                // });
                return res.send({
                    message: 'Password do not match'
                });
            }
            let hashedPwd = await bcrypt.hash(userpwd, 8);
            console.log(hashedPwd);
            
            db.query('INSERT INTO users SET ?', {userid: userid,email: email,gender: gender,phoneNumber: phoneNumber,termsAndConditions: termsAndConditions,  userpwd: hashedPwd, email: email}, (err, results) =>{
                if(err) throw err;
                
                console.log(results);
                return res.redirect('/signup'), console.log("sssssssssss");
            });
        });

        
};



exports.isLoggedIn = async (req, res, next) => {
  
    if( req.cookies.jwt) {
      try {
    
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
  
        console.log(decoded);
  
        db.query('SELECT * FROM users WHERE userid = ?', [decoded.userid], (error, result) => {
          console.log(result);
  
          if(!result) {
            return next();
          }
          
          req.user = result[0];
          console.log("user is")
          console.log(req.user);
          return next();
  
        });
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  }


  exports.logout = async (req, res) => {
      res.cookie('jwt', 'logout', {
          expires: new Date(Date.now()+ 2*1000),   // 2 * 1000 밀리세컨드
          httpOnly: true
      });

      res.status(200).redirect('/');
  }