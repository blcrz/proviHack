const Mentorado = require('../models/mentorado')

module.exports = app => {
    app.post("/register", (req, res) => {
        Mentorado.registrar(req.body, res)
    })

    app.post('/upload', (req, res) => {
        Mentorado.upload(req, res)
    })

    app.post('/login', (req, res) =>{
        Mentorado.login(req.body, res)
    })

}