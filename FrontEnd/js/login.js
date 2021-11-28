$('#logar').click((e) => {
    logar(e)
})


function logar(e) {
    e.preventDefault()
    const perfil = $('#selectPerfil').val()

    const entidade = perfil === 1 ? new Mentor() : new Mentorado()
    const params = {}

    params.email = $('#emailLogin').val()
    params.senha = $('#senhaLogin').val()


    const result = entidade.login(params)

    result.done((response) =>{
        console.log(response)
        localStorage.setItem('login', true)
        localStorage.setItem('usuarioLogado', response.id)

        location.href = './mentorias.html'
    }).fail((err) => {
        const html = `<div class="alert alert-danger" role="alert" id="alerta">${err.responseJSON.msg}</div>`
        $('#alerta').html(html)
    })
}