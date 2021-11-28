// const moment = require('moment')
const bcrypt = require("bcrypt")
const conexao = require('../infra/conexao')
const multer = require('multer');

const parser = multer({ dest: 'public/uploads/' })
const saltRouns = 10

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
                const idmentor = result[0].idmentor

                bcrypt.compare(senha, result[0].senha, (erro, result) => {
                    if(result){
                        res.status(200).json({msg: "Usuario logado com sucesso", id: idmentor})
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

    lista(idUsuario, res) {
        const sql = 'select * from mentor where idmentor <> ' + idUsuario

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    filtrar(filtros, res) {

        const idUsuario = filtros.usuarioLogado
        const filtro = filtros.filtro

        const sql = 'select * from mentor where idmentor <> ' + idUsuario + ' and atributo like '+ `'%${filtro}%'` + 'or nome like '+ `'%${filtro}%'`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Mentor