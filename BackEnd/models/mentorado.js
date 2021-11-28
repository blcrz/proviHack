// const moment = require('moment')
const bcrypt = require("bcrypt")
const saltRouns = 10
const conexao = require('../infra/conexao')
const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })

class Mentorado {
    registrar(mentorado, res) {
        const email = mentorado.email
        const password = mentorado.password

        conexao.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if(err){
                res.send(err)
            }
            if(result.length == 0){
                bcrypt.hash(password, saltRouns, (err, hash) => {
                    conexao.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
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
    }

    login(mentorado, res){
        const email = mentorado.email
        const password = mentorado.password

        conexao.query("SELECT * FROM users WHERE email = ? ", [email], (err, result) => {
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
    }

    upload(req, res){
        parser.single('avatar')(req, res, err => {
            if (err)
                res.status(500).json({ error: 1, payload: err });
            else {
                const image = {};
                image.id = req.file.filename;
                image.url = `/uploads/${image.id}`;
                res.status(200).json({ error: 0, payload: { id: image.id, url: image.url } });
            }
        });
    }
}

module.exports = new Mentorado