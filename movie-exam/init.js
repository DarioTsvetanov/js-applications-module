function addEventHandlers() {

    //add partial templates

    const navigationTemplate  = Handlebars.compile(document.querySelector('#navigation-template').innerHTML);
    const movieTemplate = Handlebars.compile(document.querySelector('#movie-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('movie-template', movieTemplate);

    navigate('home');
}

function navigateHandler(e) {
    e.preventDefault();

    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') return;

    let url;

    if (e.target.tagName == 'A') url = new URL(e.target.href);
    else if (e.target.tagName == 'IMG') url = new URL(e.target.parentElement.href);
    else if (e.target.tagName == 'BUTTON') url = new URL(e.target.parentElement.href);

    navigate(url.pathname.slice(1));
}

async function onLoginSubmit(e) {
    try {
        e.preventDefault();

        const email = document.querySelectorAll('#login-form input')[0].value;
        const password = document.querySelectorAll('#login-form input')[1].value;

        if (email == '' || password == '') return;

        let user = {
            email,
            password
        }

        await authServise.login(user);

        document.querySelector('#login-form').style.display = 'none';

        await showNotification('Logged in successfully', 'success');

        navigate('home');
    }
    catch (e) {
        showNotification(e.message, 'error');
    }
}

async function onRegisterSubmit(e) {
    try {
        e.preventDefault();

        const email = document.querySelectorAll('#register-form input')[0].value;
        const password = document.querySelectorAll('#register-form input')[1].value;
        const repeatedPassword = document.querySelectorAll('#register-form input')[2].value;

        if (email == '' || password == '' || repeatedPassword !== password) return;

        let user = {
            email,
            password
        }

        await authServise.register(user);

        await showNotification('Successful registration!', 'success');

        navigate('home');
    }

    catch (e) {
        showNotification(e.message, 'error');
    }
}

async function logoutUser(e) {
    try {
        e.preventDefault();

        await authServise.logout();

        document.querySelector('#home-container').style.display = 'none';

        await showNotification('Successful logout', 'success');

        navigate('login');
    }
    catch (e) {
        console.log(e.message);
    }
}

async function onCreateMovieSubmit(e) {
    try {
        e.preventDefault()

        let title = document.querySelectorAll('#create-movie-form input')[0].value;
        let description = document.querySelectorAll('#create-movie-form textarea')[0].value;
        let imageUrl = document.querySelectorAll('#create-movie-form input')[1].value;
        let creator = JSON.parse(localStorage.getItem('auth')).email;

        if (title == '' || description == '' || imageUrl == '') {
            document.querySelector('#create-movie-form').style.display = 'none';

            await showNotification('Invalid inputs!', 'error');

            navigate('home');

            return;
        }

        let movie = {
            creator,
            title,
            description,
            imageUrl,
            likes: 0,
            peopleLiked: ['']
        }
        
        await movieService.create(movie);

        document.querySelector('#create-movie-form').style.display = 'none';

        await showNotification('Created successfully', 'success');

        navigate('home')
    }
    catch (e) {

        console.log(e);
    }
}

async function onEditMovieSubmit(e, id) {
    try {
        e.preventDefault();

        let title = document.querySelectorAll('#edit-movie-form input')[0].value;
        let description = document.querySelectorAll('#edit-movie-form textarea')[0].value;
        let imageUrl = document.querySelectorAll('#edit-movie-form input')[1].value;

        if (title == '' || description == '' || imageUrl == '') return;

        let movie = {
            title,
            description,
            imageUrl
        }
        
        await movieService.update(id, movie);
        
        navigate(`details/${id}`);
    }
    catch (e) {

    }
}

async function deleteMovie(e, id) {
    e.preventDefault();

    await movieService.delete(id);

    navigate('home');
}

async function likeMovie(e, id) {
    e.preventDefault();

    await movieService.like(id);

    navigate(`details/${id}`);
}

async function showNotification(text, type) {
    let notificationSection;

    if (type == 'error') {
        notificationSection = document.querySelector('#error-notification');
    }
    else if (type == 'success') {
        notificationSection = document.querySelector('#success-notification');
    }

    notificationSection.firstElementChild.textContent = text;
    notificationSection.style.display = 'block';

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            notificationSection.style.display = 'none';
            resolve();
        }, 1000);
    })
}

async function onSearchSubmit(e) {
    e.preventDefault();

    let searchText = document.querySelector('#search-form input').value;

    navigate(`home?search=${searchText}`);
}
addEventHandlers();