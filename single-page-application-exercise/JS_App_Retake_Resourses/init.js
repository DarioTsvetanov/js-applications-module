function addEventHandlers() {

    const navigationTemplate  = Handlebars.compile(document.querySelector('#navigation-template').innerHTML);
    const shoeItemTemplate = Handlebars.compile(document.querySelector('#shoe-item-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('shoe-item', shoeItemTemplate);

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

function onRegisterFormSubmit(e) {
    e.preventDefault();

    const email = document.querySelectorAll('#register-form input')[0].value;
    const password = document.querySelectorAll('#register-form input')[1].value;
    const repeatedPassword = document.querySelectorAll('#register-form input')[2].value;

    if (email == '' || password.length < 6 || password !== repeatedPassword) return;

    const userBody = {
        email,
        password
    }

    authServise.register(userBody)
        .then(x => {
            navigate('home');
        })
}

function onLoginFormSubmit(e) {
    e.preventDefault();

    const email = document.querySelectorAll('#login-form input')[0].value;
    const password = document.querySelectorAll('#login-form input')[1].value;

    if (email == '' || password == '') return;

    authServise.login(email, password)
        .then(x => {
            navigate('home')
        })
        .catch((e) => console.log(e.message))
}

function onCreateItemSubmit(e) {
    e.preventDefault();

    const name = document.querySelectorAll('#create-form input')[0].value;
    const price = document.querySelectorAll('#create-form input')[1].value;
    const imageUrl = document.querySelectorAll('#create-form input')[2].value;
    const description = document.querySelector('#create-form textarea').value;
    const brand = document.querySelectorAll('#create-form input')[3].value;

    if (name == '' || price == '' || imageUrl == '' || description == '' || brand == '') return;

    const shoe = {
        name, 
        price,
        imageUrl,
        description,
        brand,
        creator: JSON.parse(localStorage.getItem('auth')).email,
        peopleBoughtIt: ['az'],
        boughtTimes: 0,
    }

    shoeService.create(shoe)
        .then(x => {
            navigate('home');
        });
}

function deleteShoeItem(key) {
    shoeService.delete(key)
        .then(x => {
            navigate('home');
        })
}

function onEditItemSubmit(e, id) {
    e.preventDefault();

    const name = document.querySelectorAll('#edit-form input')[0].value;
    const price = document.querySelectorAll('#edit-form input')[1].value;
    const imageUrl = document.querySelectorAll('#edit-form input')[2].value;
    const description = document.querySelector('#edit-form textarea').value;
    const brand = document.querySelectorAll('#edit-form input')[3].value;

    const shoe = {
        name,
        price,
        imageUrl,
        description,
        brand
    }

    shoeService.edit(shoe, id)
        .then(x => {
            navigate(`details/${id}`)
        })
}

async function onItemBuy(e, id) {
    e.preventDefault();

    await shoeService.buy(id);
    navigate(`details/${id}`)
}

addEventHandlers();