// const moment = require('moment')
const bcrypt = require("bcrypt")
const saltRouns = 10
const conexao = require('../infra/conexao')
const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })

class Mentor {
    registrar(mentor, res) {
        const {
            nome, email, senha, idade, sexo, resumo, linkedin, atributo, imagem
        } = mentor

        conexao.query("SELECT * FROM mentor WHERE email = ?", [email], (err, result) => {
            if(err){
                res.send(err)
            }
            if(result.length == 0){
                bcrypt.hash(senha, saltRouns, (err, hash) => {
                    conexao.query("INSERT INTO mentor (nome, email, senha, idade, sexo, resumo, linkedin, atributo, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [nome, email, hash, idade, sexo, resumo, linkedin, atributo, imagem ], (err, response) => {
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

    login(mentor, res){
        const email = mentor.email
        const senha = mentor.senha

        conexao.query("SELECT * FROM mentor WHERE email = ? ", [email], (err, result) => {
            if(err){
                res.send(err);
            }
            if(result.length > 0){
                bcrypt.compare(senha, result[0].senha, (erro, result) => {
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

module.exports = new Mentor