const login = localStorage.getItem('login')

if(!login) {
    location.href = '../view/login.html'
}