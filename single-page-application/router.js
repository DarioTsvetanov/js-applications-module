const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'add-movie': 'add-movie-template',
    'details': 'movie-details-template',
    'edit': 'edit-movie-template'
}

const router = async (fullPath) => {
    let [path, id, action] = fullPath.split('/');
    
    let app = document.querySelector('#app');
    let templateData = authServise.getData();

    let templateId = routes[path];

    if (path == 'logout') {
        authServise.logout();

        navigate('home');

        return; 
    }
    else if (path == 'home') {

        templateData.movies = await movieService.getAll();
    }
    else if (path == 'details' && id !== '') {
        
        let movieDetails = await movieService.getMovieDetails(id);

        if (action == 'edit') {
            templateId = routes['edit'];
        }
        else if (movieDetails.creator == JSON.parse(localStorage.getItem('auth')).email) {
            Object.assign(movieDetails, {isCreator: true});
        }

        Object.assign(templateData, movieDetails, {id});
    }
      
    let template = Handlebars.compile(document.getElementById(templateId).innerHTML);

    app.innerHTML = template(templateData);
}

const navigate = (path) => {
    history.pushState({}, '', '/' + path);
    router(path);
}