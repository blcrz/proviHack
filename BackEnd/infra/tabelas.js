class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarTabelas()
    }

    criarTabelas() {
        const tabelas = ['CREATE TABLE IF NOT EXISTS mentor' +
        '( ' +
            'idmentor int NOT NULL AUTO_INCREMENT, ' +
            'nome varchar(45) NOT NULL, ' +
            'email varchar(45) NOT NULL, ' +
            'senha varchar(200) NOT NULL, ' +
            'idade int NOT NULL, ' +
            'sexo int NOT NULL, ' +
            'resumo varchar(200) NOT NULL, ' +
            'linkedin varchar(45) NOT NULL, ' +
            'atributo varchar(200) NOT NULL, ' +
            'imagem varchar(250) NOT NULL, ' +
            'PRIMARY KEY (idmentor)' +
        '); ',

        'CREATE TABLE IF NOT EXISTS mentorado' +
        ' ('+
            'idmentorado int NOT NULL AUTO_INCREMENT, '+
            'nome varchar(45) NOT NULL, '+
            'email varchar(45) NOT NULL, '+
            'senha varchar(200) NOT NULL, '+
            'idade int NOT NULL, '+
            'sexo varchar(45) NOT NULL, '+
            'linkedin varchar(45) NOT NULL, '+
            'imagem varchar(250) NOT NULL, '+
            'PRIMARY KEY (idmentorado)'+
        '); ',

        'CREATE TABLE IF NOT EXISTS mentoria'+
        '( '+
            'idmentoria int NOT NULL AUTO_INCREMENT, '+
            'mentorId int NOT NULL, '+
            'mentoradoId int NOT NULL, '+
            'PRIMARY KEY (idmentoria), '+
            'KEY mentorId_idx (mentorId), '+
            'KEY mentoradoId_idx (mentoradoId), '+
            'CONSTRAINT mentoradoId FOREIGN KEY (mentoradoId) REFERENCES mentorado (idmentorado), '+
            'CONSTRAINT mentorId FOREIGN KEY (mentorId) REFERENCES mentor (idmentor) '+
          ');']

        tabelas.forEach(sql =>{
            this.conexao.query(sql, (erro) => {
                if(erro){
                    console.log(erro)
                } else {
                    console.log('Tabela criada com sucesso')
                }
            })
        })

    }
}


module.exports = new Tabelas