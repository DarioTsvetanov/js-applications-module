const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'details': 'details-template', 
    'edit': 'edit-template'
}

const router = async (fullPath) => {
    let [path, id, action] = fullPath.split('/');

    const app = document.querySelector('#content-container');

    let templateId = routes[path];
    const templateData = authServise.getData();

    if (path == 'home') {

        let res = await articleService.getAll();
        templateData.articles = res;
    }

    const template = Handlebars.compile(document.getElementById(templateId).innerHTML);
    app.innerHTML = template(templateData);
}

const navigate = (path) => {
    history.pushState({}, '', '/' + path);

    router(path);
}