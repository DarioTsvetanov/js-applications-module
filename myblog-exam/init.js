function addEventHandlers() {

    //add partial templates

    const navigationTemplate = Handlebars.compile(document.querySelector('#navigation-template').innerHTML);
    const createPostTemplate = Handlebars.compile(document.querySelector('#create-post-template').innerHTML);
    const postTemplate = Handlebars.compile(document.querySelector('#single-post-template').innerHTML);
    // const shoeItemTemplate = Handlebars.compile(document.querySelector('#shoe-item-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('create-post-template', createPostTemplate);
    Handlebars.registerPartial('post-template', postTemplate);
    // Handlebars.registerPartial('shoe-item', shoeItemTemplate);

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

async function onLoginFormSubmit(e) {
    try {
        e.preventDefault();

        const email = document.querySelectorAll('.login-form form input')[0].value;
        const password = document.querySelectorAll('.login-form form input')[1].value;

        if (email == '' || password == '') return;

        await authServise.login(email, password);
        
        navigate('home')
    }
    catch (e) {
        console.log(e.message)
    }
}

async function onRegisterFormSubmit(e) {
    try {
        e.preventDefault();

        const email = document.querySelectorAll('.register-form form input')[0].value;
        const password = document.querySelectorAll('.register-form form input')[1].value;
        const repeatedPassword = document.querySelectorAll('.register-form form input')[2].value;

        if (email == '' || password == '' || repeatedPassword !== password) return;

        const user = {
            email,
            password
        }

        await authServise.register(user);
        
        navigate('home');
    }
    catch (e) {
        console.log(e.message);
    }
}

async function logout(e) {
    try {
        e.preventDefault();

        await authServise.logout();

        navigate('home');
    }
    catch (e) {
        console.log(e.message);
    }
}

async function createPost(e) {
    try {
        e.preventDefault();

        const title = document.querySelectorAll('#create-post-form input')[0].value;
        const category = document.querySelectorAll('#create-post-form input')[1].value;
        const content = document.querySelectorAll('#create-post-form textarea')[0].value;

        const post = {
            title,
            category,
            content
        }
        
        const res = await postService.create(post);
        
        navigate('home');
    }
    catch (e) {
        console.log(e.message);
    }
}

async function onEditButtonSubmit(e) {
    e.preventDefault();

    const id = location.pathname.split('/')[1];

    const title = document.querySelectorAll('.edit-form input')[0].value;
    const category = document.querySelectorAll('.edit-form input')[1].value;
    const content = document.querySelectorAll('.edit-form textarea')[0].value;

    const data = {
        title,
        category,
        content
    }

    await postService.edit(data, id);

    navigate('home');
}

async function deletePost(e, id) {
    e.preventDefault();

    await postService.delete(id);

    navigate('home')
}
addEventHandlers();
