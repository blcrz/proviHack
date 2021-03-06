class Mentor {
    apiUrl = "http://localhost:3001"

    login(params) {
        return $.ajax({
            url: this.apiUrl + '/mentor/login',
            type: 'POST',
            dataType: 'json',
            data: params
        })
    }

    cadastrar(params) {
        return $.ajax({
            url: this.apiUrl + '/mentor/registrar',
            type: 'POST',
            dataType: 'json',
            data: params
        })
    }

    upload(params) {
        console.log(params)
        const formData = new FormData()
        formData.set('avatar', params)
        console.log(formData)

        return $.ajax({
            url: this.apiUrl + '/mentor/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
        })
    }

    listar() {
        return $.ajax({
            url: this.apiUrl + '/mentor/' + localStorage.getItem('usuarioLogado'),
            type: 'GET',
        })
    }

    filtrar(params) {
        return $.ajax({
            url: this.apiUrl + '/filtro/mentor/',
            type: 'GET',
            data: params,
            dataType: 'json',
        })
    }
}

