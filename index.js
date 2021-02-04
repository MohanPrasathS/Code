const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const pg_1 = require('pg');
const bodyParser = require('body-parser');
const alert = require('alert');
const path = require('path');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');


app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//const dbHost = process.env.PG_DB_HOST;
//const dbPort = Number(process.env.PG_DB_PORT);
//const dbUser = process.env.PG_DB_USER;
//const dbDb = process.env.PG_DB_DB;
//const dbPasswd = process.env.PG_DB_PASSWD;

//const pool = new pg_1.Pool({
//    host: 'ec2-54-159-107-189.compute-1.amazonaws.com',
//    user: 'otuwstlmetkuzh',
//    database: 'df4kau9c7sqlko',
//    password: '2b3c00ad4ff11e72154bf63d4310dcacbcf657caeeefdbdac857939fcf0b6637',
//    port: 5432,
//});

const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'test',
    password: 'password',
    port: 5432,
});

app.use(express.static("views/sign-in/"));

//app.get('/',(req,res) => {
//    res.sendFile('views/sign-in/', {root: __dirname});
//    app.use(express.static(sign-in));
//});

app.post('/index',(req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + " " + password);
    const fetch_query = "select * from signin where username = $1";
    var signin = false;
    pool.query(fetch_query,[username])
        .then((res) => {
            if(res.rowCount){
                var user = res.rows[0].username;
                var pass = res.rows[0].password;
                console.log(user +" "+ pass);
                if(username === user && password === pass){
                    signin = true;
                }
            }
        })
        .catch((err) => {
            console.log("Invalid Username");
        });
    setTimeout(() => {
        if(signin){
            res.sendFile('views/index.html', {root:__dirname});
            console.log('Successfully Logged  In!');
            alert("Successfully Logged In!");
        } else{
            res.redirect('/');
            console.log("Invalid Username or Password");
            alert('Invalid Username or Password');
        }
     }, 500);

});
app.post('/select', (req, res) => {
    const select_query = "SELECT * from student;";
    pool.query(select_query, (err, result) => {
        if(err){
            return console.log(`Error Occurred ${err}`);
        }
        console.log(result.rows.length + " Records Found");
        res.send(result.rows);
    });
});



app.post('/insert', (req, res) => {
    const {rollNo, status, time, date} = req.body;
    console.log(req.body);
    const insert_query = "INSERT into student VALUES($1, $2, $3, $4);";
    try{
        pool.query(insert_query,[rollNo, status, time, date]);
    }
    catch(e){
        console.log(e);
    }
});
var j = schedule.scheduleJob({hour:11, minute : 20}, () => {
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'mohanprasath1999@gmail.com',
            pass : 'rrqemvaysrwocjko'
        }
    });

    var mailOptions = {
        from : 'mohanprasaths2021@srishakthi.ac.in',
        to : 'mohanprasaths2021@srishakthi.ac.in, dheenasenanm2021@srishakthi.ac.in, hariprasanthr2021@srishakthi.ac.in',
        subject : 'Mail from node JS',
        text : 'This is to verify that the nodeMailer is working fine!. Please do not reply to this mail'
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log("Error occured");
            console.log(err);
        } else {
            console.log("Email Sent! " + info.response);
        }
    });
});


