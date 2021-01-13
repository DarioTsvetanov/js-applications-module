const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'details': 'details-template', 
    'edit': 'edit-post-template'
}

const router = async (fullPath) => {
    let [path, id] = fullPath.split('/');

    const app = document.querySelector('#root');

    let templateId = routes[path];
    const templateData = authServise.getData();

    if (path == 'home') {

        const posts = await postService.getAll();
        
        templateData.posts = posts;
    }
    else if (path == 'details') {

        const data = await postService.getOne(id);
        Object.assign(templateData, data);
    }
    else if (id == 'edit') {

        const data = await postService.getOne(path);
        Object.assign(templateData, data);

        templateId = routes['edit'];
    }

    const template = Handlebars.compile(document.getElementById(templateId).innerHTML);
    app.innerHTML = template(templateData);
}

navigate = (path) => {
    history.pushState({}, '', '/' + path);

    router(path);
}