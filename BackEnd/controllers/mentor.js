const Mentor = require('../models/mentor')

module.exports = app => {
    app.post("/mentor/registrar", (req, res) => {
        Mentor.registrar(req.body, res)
    })

    app.post('/mentor/upload', (req, res) => {
        Mentor.upload(req, res)
    })

    app.post('/mentor/login', (req, res) =>{
        Mentor.login(req.body, res)
    })

    app.get('/mentor/:id', (req, res) =>{
        Mentor.lista(req.params.id, res)
    })

    app.get('/filtro/mentor', (req, res) =>{
        Mentor.filtrar(req.body, res)
    })
}

