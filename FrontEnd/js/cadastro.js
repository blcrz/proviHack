let idFoto = null

$('#btnCadastrar').click((e) => {
    cadastrar(e)
})

$('#img').change((e) => {
    e.preventDefault()

    upload(e)
})

$('#categoria').change((e) => {
    const hidden = ['#campoResumo', '#campoSkill']
    if($('#categoria').val() !== '1') {
        hidden.forEach(el => $(el).addClass('hidden'))
    } else {
        hidden.forEach(el => $(el).removeClass('hidden'))
    }

})

function upload(){
    const mentor = new Mentor()

    const img = $('#img')

    if(img[0]){
        const file = img[0].files[0]
        const result = mentor.upload(file)

        result.done((response) => {
            idFoto = response.payload.id

        }).fail((err) => {
            console.log(err)
        })
    }
}

function cadastrar(e) {
    e.preventDefault()
    const perfil = $('#categoria').val()

    const entidade = perfil === '1' ? new Mentor() : new Mentorado()
    const params = {}

    params.nome = $('#nome').val()
    params.email = $('#email').val()
    params.senha = $('#senha').val()
    params.idade = parseInt($('#idade').val())
    params.sexo = parseInt($('#genero').val())
    params.linkedin = $('#linkedin').val()
    params.imagem = idFoto

    if (perfil === '1') {
        params.resumo = $('#resumo').val()
        params.atributo = $('#atributo').val()
    }

    const result = entidade.cadastrar(params)

    result.done((response) =>{
        location.href = '../view/login.html'
    }).fail((err) => {
        console.log(err)
    })
}