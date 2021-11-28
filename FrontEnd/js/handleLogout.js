const login = localStorage.getItem('login')
console.log(login)

if(login) {
    location.href = '../../index.html'
}