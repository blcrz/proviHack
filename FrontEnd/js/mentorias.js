listarMentores()

function listarMentores() {
    const mentor = new Mentor()
    const result = mentor.listar()

    result.done( data => {
        data.forEach(elemento => {
            const html = `
            <div class="col">
                <div class="card h-100">
                    <img src="http://localhost:3001/uploads/${elemento.imagem}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.nome}</h5>
                        <p class="card-text">${elemento.resumo}</p>
                        <button type="button" class="btn btn-outline-primary">Entre em contato</button>
                    </div>
                </div>
            </div>
        `
            console.log(elemento)
        $('#listaMentores').append(html)

        })
    })
}

$('#procurar').click((e) => {
    const mentor = new Mentor
    const filtro = $('#filtro').val()

    const result = mentor.filtrar({filtro: filtro, usuarioLogado: localStorage.getItem('usuarioLogado')})

    result.done(response => {
        console.log(response)
        $('#listaMentores').append('')

        response.forEach(elemento => {
            const html = `
            <div class="col">
                <div class="card h-100">
                    <img src="http://localhost:3001/uploads/${elemento.imagem}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.nome}</h5>
                        <p class="card-text">${elemento.resumo}</p>
                        <button type="button" class="btn btn-outline-primary">Entre em contato</button>
                    </div>
                </div>
            </div>
        `
            console.log(elemento)
        $('#listaMentores').append(html)

        })

    })
 })