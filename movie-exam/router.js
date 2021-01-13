const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'create-movie': 'create-movie-template',
    'details': 'details-template', 
    'edit': 'edit-template'
}

const router = async (url) => {
    let [fullPath, queryString] = url.split('?');
    let searchText = queryString?.split('=')[1];
    let [path, id, action] = fullPath.split('/');

    const app = document.querySelector('#container');

    let templateId = routes[path];
    const templateData = authServise.getData();

    if (path == 'home') {
        templateData.movies = await movieService.getAll(searchText);
    }
    else if (path == 'details' || path == 'edit') {
        let data = await movieService.getOne(id);

        if (data.creator == JSON.parse(localStorage.getItem('auth')).email) Object.assign(data, {isCreator: true});
        
        if (data.peopleLiked.includes(JSON.parse(localStorage.getItem('auth')).email)) data.isLiked = true;

        Object.assign(templateData, data);
    }

    const template = Handlebars.compile(document.getElementById(templateId).innerHTML);
    app.innerHTML = template(templateData);
}

navigate = (path) => {
    history.pushState({}, '', '/' + path);

    router(path);
}