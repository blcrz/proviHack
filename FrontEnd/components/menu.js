class menu extends HTMLElement {
    constructor(){
        super()
        this.build()
    }

    build(){
        const shadow = this.attachShadow({mode:'open'})

        shadow.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        `
        shadow.appendChild(this.style())

        const menu = this.createMenu()

        shadow.appendChild(menu)
    }

    createMenu() {
        const pathAttr = this.getAttribute('path-pages')
        const pathPages = pathAttr ?? './'

        const nav = document.createElement('nav')
        nav.className = 'navbar navbar-expand-lg navbar-light bg-light pb-0 pt-0'

        const div = document.createElement('div')
        div.classList.add('container-fluid')

        //logo do menu

        const a = document.createElement('a')
        a.classList.add('navbar-brand')
        a.href = pathAttr ? '#' : '../../index.html'

        const img = document.createElement('img')
        img.className = 'nav-logo mx-5'
        const path = this.getAttribute('path-img-logo')
        const pathImg = path ?? '../assets/img/'
        img.src = `${pathImg}logo.png`

        a.appendChild(img)

        // hamburger

        const button = document.createElement('button')
        button.classList.add('navbar-toggler')
        button.type = 'button'
        button.setAttribute('data-bs-toggle', 'collapse')
        button.setAttribute('data-bs-target', '#navbarSupportedContent')
        button.setAttribute('aria-controls', 'navbarSupportedContent')
        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('aria-label', 'Toggle navigation')
        button.id = 'hamburger'
        button.addEventListener('click', this.toggleMenu.bind(this))

        const span = document.createElement('span')
        span.classList.add('navbar-toggler-icon')

        button.appendChild(span)

        // itens do menu

        const divCollapse = document.createElement('div')
        divCollapse.className = 'collapse navbar-collapse mx-5'
        divCollapse.id = 'navbarSupportedContent'

        const ul = document.createElement('ul')
        ul.className = 'navbar-nav mb-2 mb-lg-0 align-items-center'

        const li1 = document.createElement('li')
        li1.className = 'nav-item px-3'

        const ali1 = document.createElement('a')
        ali1.classList.add('nav-link')
        ali1.innerHTML = 'início'
        ali1.href = pathAttr ? '#' : '../../index.html'

        li1.appendChild(ali1)
        ul.appendChild(li1)

        const li2 = document.createElement('li')
        li2.className = 'nav-item px-3'

        const ali2 = document.createElement('a')
        ali2.classList.add('nav-link')
        ali2.innerHTML = 'quem somos'
        ali2.href = `${pathPages}somos.html`

        li2.appendChild(ali2)
        ul.appendChild(li2)

        const li3 = document.createElement('li')
        li3.className = 'nav-item px-3'

        const login = localStorage.getItem('login')

        if(login){
            const ali3 = document.createElement('a')
            ali3.classList.add('nav-link')
            ali3.innerHTML = 'pessoas mentoras'
            ali3.href = `${pathPages}mentorias.html`

            li3.appendChild(ali3)
            ul.appendChild(li3)
        }

        const li4 = document.createElement('li')
        li4.className = 'nav-item px-3'

        const ali4 = document.createElement('a')
        ali4.classList.add('nav-link')
        ali4.innerHTML = !login ? 'login' : 'sair'
        ali4.href = `${pathPages}login.html`
        ali4.onclick = login ? this.logout : null

        li4.appendChild(ali4)
        ul.appendChild(li4)


        // adicionando todos os elementos no navbar

        divCollapse.appendChild(ul)

        div.appendChild(a)
        div.appendChild(button)
        div.appendChild(divCollapse)

        nav.appendChild(div)

        return nav
    }

    toggleMenu() {
        const options = this.shadowRoot.getElementById('navbarSupportedContent')

        if (options.classList.contains('show')) {
            options.classList.remove('show')
        } else {
            options.classList.add('show')
        }
    }

    logout() {
        localStorage.removeItem('login')
        localStorage.removeItem('usuarioLogado')
    }

    style(){
        const style = document.createElement('style')
        style.textContent = `
        .nav-logo {
            width: 30vh;
        }
        .navbar {
            box-shadow: 0px 0px 16px #cccccc;
        }
        .nav-button {
            background-color: #975AB6;
            color: #fff;
            border-radius: 10px;
        }
        .navbar-collapse{
            justify-content: end !important;
        }
        .btn:hover{
            transform: scale(1.02);
            color: #fff;
        }
        .btn:focus{
            box-shadow: unset;
        }
        `
        return style
    }
}
customElements.define('nav-bar', menu)