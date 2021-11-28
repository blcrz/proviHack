const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'banco'
})

module.exports = conexao