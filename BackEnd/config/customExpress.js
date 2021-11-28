const express = require('express');
const path = require('path');
const consign = require('consign');
const cors = require('cors')
const nocache = require('nocache');


module.exports = () => {
    const app = express()

    app.use(express.urlencoded({ extended: true}))
    app.use(express.json())
    app.use(cors())
    app.use('/uploads/', express.static(path.resolve(__dirname + '/../public/uploads/')));
    app.use(nocache());

    consign()
        .include('controllers')
        .into(app)

    return app
}