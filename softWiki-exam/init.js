function addEventHandlers() {

    //add partial templates

    const navigationTemplate  = Handlebars.compile(document.querySelector('#navigation-template').innerHTML);
    const articleTemplate = Handlebars.compile(document.querySelector('#article-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('article-item', articleTemplate);

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

async function onRegisterFormSubmit(e) {
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
    
    navigate('home');
}

async function onLoginFormSubmit(e) {
    e.preventDefault();

    const email = document.querySelectorAll('#login-form input')[0].value;
    const password = document.querySelectorAll('#login-form input')[1].value;

    if (email == '' || password == '') return;

    await authServise.login(email, password);
    
    navigate('home');
}

async function onLogoutClick(e) {
    e.preventDefault();

    await authServise.logout();

    navigate('login');
}

addEventHandlers();