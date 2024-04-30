import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended : false} ));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12341234',
    database: 'ticket_app',
})


app.get('/movielist', (req, res) => {
    const sql = "SELECT * FROM movie_list";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    });
})


app.listen(8082, () => {
    console.log("Listening2")
})
