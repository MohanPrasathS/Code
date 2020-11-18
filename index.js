const port = process.env.PORT || 5000;
const express = require('express');
const app = express();

app.use(express.json({extended: false}));
const pg_1 = require('pg');
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.get('/',(req,res) => {
res.send("Hello Word!");
});

const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'test',
    password: 'password',
    port: 5432,
});
const select_query = "SELECT * from student";

pool.query(select_query, (err, result) => {
    if(err){
        return console.log('Error Occurred');
    }
    console.log(result.rows.length + " Records Found");
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
