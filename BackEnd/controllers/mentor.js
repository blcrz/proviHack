const Mentor = require('../models/mentor')

module.exports = app => {
    app.post("/register", (req, res) => {
        Mentor.registrar(req.body, res)
    })

    app.post('/upload', (req, res) => {
        Mentor.upload(req, res)
    })

    app.post('/login', (req, res) =>{
        Mentor.login(req.body, res)
    })

}

