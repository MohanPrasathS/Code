const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const pg_1 = require('pg');
var path = require('path');

app.use(express.json({extended: false}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//
//const dbHost = process.env.PG_DB_HOST;
//const dbPort = Number(process.env.PG_DB_PORT);
//const dbUser = process.env.PG_DB_USER;
//const dbDb = process.env.PG_DB_DB;
//const dbPasswd = process.env.PG_DB_PASSWD;
//
//const pool = new pg_1.Pool({
//    host: dbHost,
//    user: dbUser,
//    database: dbDb,
//    password: dbPasswd,
//    port: dbPort,
//});
//
//const conn = 'postgres://otuwstlmetkuzh:2b3c00ad4ff11e72154bf63d4310dcacbcf657caeeefdbdac857939fcf0b6637@ec2-54-159-107-189.compute-1.amazonaws.com:5432/df4kau9c7sqlko';
//const client = new pg_1.Client({conn});
//client.connect();
//console.log(`${dbHost}  ${dbUser}  ${dbPort}  ${dbDb}   ${dbPasswd}`);

const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'test',
    password: 'password',
    port: 5432,
});
app.get('/',(req,res) => {
    res.sendFile('views/index.html', {root: __dirname});

});
app.get('/select', (req, res) => {
    const select_query = "SELECT * from student";
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
