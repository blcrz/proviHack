const Mentorado = require('../models/mentorado')

module.exports = app => {
    app.post("/mentorado/registrar", (req, res) => {
        Mentorado.registrar(req.body, res)
    })

    app.post('/mentorado/upload', (req, res) => {
        Mentorado.upload(req, res)
    })

    app.post('/mentorado/login', (req, res) =>{
        Mentorado.login(req.body, res)
    })

}