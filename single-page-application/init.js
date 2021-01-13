function addEventListeners() {
    let navigationTemplate = Handlebars.compile(document.querySelector('#navigation-template').innerHTML);
    let movieCardTemplate = Handlebars.compile(document.querySelector('#movie-card-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('movie-card', movieCardTemplate);

    navigate('home');
}

function navigateHandler(e) {
    e.preventDefault();
    
    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') return;

    let url;

    if (e.target.tagName == 'A') url =  new URL(e.target.href);
    else url  = new URL(e.target.parentElement.href);

    navigate(url.pathname.slice(1));
}

function onLoginSubmit(e) {
    e.preventDefault();

    const email = document.querySelectorAll('#login .form-control')[0].value;
    const password = document.querySelectorAll('#login .form-control')[1].value;

    authServise.login(email, password)
        .then(data => {
            navigate('home');
        })
} 

function onAddMovieSubmit(e) {
    e.preventDefault();

    const title = document.querySelectorAll('#add-movie-form input')[0].value;
    const description = document.querySelector('#add-movie-form textarea').value;
    const imageUrl = document.querySelectorAll('#add-movie-form input')[1].value;

    const creator = JSON.parse(localStorage.getItem('auth')).email;

    movieService.add({
        title,
        description,
        imageUrl,
        creator,
        liked: 0
    })
    .then(res => {
        navigate('home');
    })
}

function onRegisterSubmit(e) {
    e.preventDefault();

    const email = document.querySelectorAll('#register-form .form-control')[0].value;
    const password = document.querySelectorAll('#register-form .form-control')[1].value;
    const repeatedPassword = document.querySelectorAll('#register-form .form-control')[2].value;

    if (password !== repeatedPassword) console.log('error');

    authServise.register({
        email,
        password
    })
    .then(x => {
        navigate('login');
    })
}

function deleteMovie(e) {
    let id = location.pathname.split('/')[2];
    
    movieService.delete(id)
        .then(x => {
            navigate('home')
        })
}

function onEditMovieSubmit(e) {
    e.preventDefault();

    let id = location.pathname.split('/')[2];

    const title = document.querySelectorAll('#edit-movie-form input')[0];
    const description = document.querySelector('#edit-movie-form textarea');
    const imageUrl = document.querySelectorAll('#edit-movie-form input')[1];

    movieService.edit(id, { title, description, imageUrl })
        .then(x => {
            navigate('home');
        })
}

addEventListeners();