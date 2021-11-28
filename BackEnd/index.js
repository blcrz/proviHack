const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const bcrypt = require("bcrypt")
const saltRouns = 10

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "banco"
})

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err)
        }
        if(result.length == 0){
            bcrypt.hash(password, saltRouns, (err, hash) => {
                db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
                    if(err){
                        res.send(err)
                    }
                    res.send({msg: 'cadastrado com sucesso'})
                })
            })

        } else {
            res.send({msg: 'email já existente'})
        }
    })
})

app.post('/login', (req, res) =>{
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ? ", [email], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (erro, result) => {
                if(result){
                    res.send({msg: "Usuario logado com sucesso"})
                } else {
                    res.send({msg: 'senha incorreta'})
                }
            })
        } else {
            res.send({msg: "email não encontrado"})
        }
    })
})

app.listen(3001, () => {
    console.log('Rodando na porta 3001')
})