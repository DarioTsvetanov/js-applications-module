const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'my-destinations': 'my-destinations-template',
    'add-destination': 'add-destination-template',
    'details': 'details-template', 
    'edit': 'edit-template'
}

const router = async (fullPath) => {
    let [path, id, action] = fullPath.split('/');

    const app = document.querySelector('#container');

    let templateId = routes[path];
    const templateData = authServise.getData();

    if (path == 'home') {
        templateData.destinations = await destinationService.getAll();
    }
    else if (path == 'details' || path == 'edit') {
        let data = await destinationService.getOne(id);

        if (data.creator == JSON.parse(localStorage.getItem('auth')).email) Object.assign(data, {isCreator: true});
        
        Object.assign(templateData, data);
    }
    else if (path == 'my-destinations') {
        templateData.myDestinations = await destinationService.getAll(true);
    }
console.log(templateData);
    const template = Handlebars.compile(document.getElementById(templateId).innerHTML);
    app.innerHTML = template(templateData);
}

navigate = (path) => {
    history.pushState({}, '', '/' + path);

    router(path);
}