// const moment = require('moment')
const bcrypt = require("bcrypt")
const saltRouns = 10
const conexao = require('../infra/conexao')
const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })

class Mentorado {
    registrar(mentorado, res) {
        const {
            nome, email, senha, idade, sexo, linkedin, imagem
        } = mentorado

        conexao.query("SELECT * FROM mentorado WHERE email = ?", [email], (err, result) => {
            if(err){
                res.send(err)
            }
            if(result.length == 0){
                bcrypt.hash(senha, saltRouns, (err, hash) => {
                    conexao.query("INSERT INTO mentorado (nome, email, senha, idade, sexo, linkedin, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)", [nome, email, hash, idade, sexo, linkedin, imagem ], (err, response) => {
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
        const senha = mentorado.senha

        conexao.query("SELECT * FROM mentorado WHERE email = ? ", [email], (err, result) => {
            if(err){
                res.send(err);
            }
            if(result.length > 0){
                const idmentorado = result[0].idmentorado
                bcrypt.compare(senha, result[0].senha, (erro, result) => {
                    if(result){
                        res.status(200).json({msg: "Usuario logado com sucesso", id: idmentorado})
                    } else {
                        res.status(401).json({msg: 'senha incorreta'})
                    }
                })
            } else {
                res.status(400).json({msg: "email não encontrado"})
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