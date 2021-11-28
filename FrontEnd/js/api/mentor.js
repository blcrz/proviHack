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
}