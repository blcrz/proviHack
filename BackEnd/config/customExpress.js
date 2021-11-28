const express = require('express');
const consign = require('consign');
const cors = require('cors')


module.exports = () => {
    const app = express()

    app.use(express.urlencoded({ extended: true}))
    app.use(express.json())
    app.use(cors())

    consign()
        .include('controllers')
        .into(app)

    return app
}