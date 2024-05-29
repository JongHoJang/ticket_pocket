import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
// import multer from 'multer'
// import path from 'path'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
dotenv.config();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12341234',
    database: 'ticket_app',
})


// 회원가입 정보 출력
app.get('/register', (req, res) => {
    const sql = "SELECT * FROM register";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// 회원가입 (register에 db 추가하기)
app.post('/register', (req, res) => {
    const sql = `INSERT INTO register (Name, Email, Password) VALUES (?)`;
    console.log(req.body)

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})


// 로그인 (register에 있나 확인)
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM register WHERE Email = ? AND Password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Error")
        if(data.length > 0) {
            return res.json("로그인 성공");

        } else {
            return res.json("아이디 혹은 비밀번호를 다시 확인해주세요")
        }
    })
})




// 영화 리스트 출력
app.get('/movielist', (req, res) => {
    const sql = "SELECT * FROM movie_list";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})






// multer 사용하여 영화 추가하기 (중간에 오류로 인해 파일이 저장이 안되긴 함)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
//
// const upload = multer({ storage: storage });


// app.post('/upload', upload.single('image'), (req, res) => {
//     const sql = "INSERT INTO movie_list (`Title`, `Date`, `CinemaName`, `SeatNumbers`, `Reviews`, `Companions`, `MoviePoster`) VALUES (?)";
//
//     // 이미지 파일 경로
//     const imagePath = req.file ? `/images/${req.file.filename}` : null;
//
//     const values = [
//         req.body.title,
//         req.body.date,
//         req.body.cinemaName,
//         req.body.seatNumbers,
//         req.body.review,
//         req.body.companions,
//         imagePath
//     ];
//
//
//     db.query(sql, [values], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.json({ Message: "Error" });
//         }
//         return res.json({ Status: "Success" });
//     });
// });



// 영화 추가 (movielist db 추가하기)
app.post('/upload', (req, res) => {
    const sql = "INSERT INTO movie_list (`Title`, `Date`, `CinemaName`, `SeatNumbers`, `Reviews`, `Companions`, `MoviePoster`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.date,
        req.body.cinemaName,
        req.body.seatNumbers,
        req.body.review,
        req.body.companions,
        req.body.posterUrl
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error" });
        }
        return res.json({ Status: "Success" });
    });
});








// ---



// 각 id 세부페이지 이동(db 띄우기)
app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM register WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// 수정(업데이트)
app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE register SET `Name`=?, `Email`=?, `Password`=? WHERE ID=?';
    const id = req.params.id;
    console.log(req.body)
    db.query(sql, [req.body.Name, req.body.Email, req.body.Password, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})


// 삭제
app.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM register WHERE ID = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})





app.listen(8081, () => {
    console.log("Listening")
})
