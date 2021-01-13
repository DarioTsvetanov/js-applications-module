const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'create-offer': 'create-offer-template',
    'details': 'details-template', 
    'edit': 'edit-template'
}

const router = async (fullpath) => {
    const [path, id, action] = fullpath.split('/');

    const app = document.querySelector('#main-container');
    
    let templateId = routes[path];
    const templateData = authServise.getData();

    if (path == 'logout') {
        authServise.logout();

        navigate('home');
    }
    else if (path == 'home') {
        templateData.shoes = await shoeService.getAll();
    }
    else if (path == 'details') {
        let info = await shoeService.getOne(id);
        let currentUserEmail = JSON.parse(localStorage.getItem('auth')).email;

        if (action == undefined) {
            
            if (info.creator == JSON.parse(localStorage.getItem('auth')).email) {
                Object.assign(templateData, {isCreator: true});
            }
            else if (info.peopleBoughtIt.includes(currentUserEmail)) {
                Object.assign(templateData, {isBought: true});
            }
        }
        else if (action == 'edit') {
            templateId = routes['edit'];
        }

        Object.assign(templateData, {id}, info);
    }

    const template = Handlebars.compile(document.getElementById(templateId).innerHTML);
    
    app.innerHTML = template(templateData);
}

function navigate(path) {
    history.pushState({}, '', '/' + path);

    router(path);
}