class Mentorado {
    apiUrl = "http://localhost:3001"

    login(params) {
        return $.ajax({
            url: this.apiUrl + '/mentorado/login',
            type: 'POST',
            dataType: 'json',
            data: params
        })
    }

    cadastrar(params) {
        return $.ajax({
            url: this.apiUrl + '/mentorado/registrar',
            type: 'POST',
            dataType: 'json',
            data: params
        })
    }
}