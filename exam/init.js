function addEventHandlers() {

    //add partial templates

    const navigationTemplate  = Handlebars.compile(document.querySelector('#navigation-template').innerHTML);
    const footerTemplate  = Handlebars.compile(document.querySelector('#footer-template').innerHTML);
    const singleDestinationTemplate  = Handlebars.compile(document.querySelector('#single-destination-template').innerHTML);
    const myDestinationTemplate  = Handlebars.compile(document.querySelector('#my-destination-template').innerHTML);
    
    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('footer-template', footerTemplate);
    Handlebars.registerPartial('single-destination-template', singleDestinationTemplate);
    Handlebars.registerPartial('my-destination-template', myDestinationTemplate);

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

        const email = document.querySelectorAll('#formLogin input')[0];
        const password = document.querySelectorAll('#formLogin input')[1];

        let error;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value == '') error = 'Please fill in your email!';
        else if (password.value == '') error = 'Please fill in your password!';
        else if (!re.test(email.value.toLowerCase())) error = 'Please enter valid email!';

        let user = {
            email: email.value,
            password: password.value
        }

        if (error) {
            await showNotification(error, 'error');

            return;
        }

        await authServise.login(user);

        email.value = '';
        password.value = '';

        await showNotification('Login successful.', 'success');

        navigate('home');
    }
    catch (e) {
        showNotification(e.message, 'error');
    }
}

async function onRegisterSubmit(e) {
    try {
        e.preventDefault();

        const email = document.querySelectorAll('#formRegister input')[0];
        const password = document.querySelectorAll('#formRegister input')[1];
        const repeatedPassword = document.querySelectorAll('#formRegister input')[2];

        let error;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value == '') error = 'Please fill in your email!';
        else if (password.value == '') error = 'Please fill in your password!';
        else if (repeatedPassword.value == '') error = 'Please fill in your repeated password!';
        else if (repeatedPassword.value !== password.value) error = 'Your passwords do not match!';
        else if (!re.test(email.value.toLowerCase())) error = 'Please enter valid email!';

        if (error) {
            await showNotification(error, 'error');

            return;
        }

        let user = {
            email: email.value,
            password: password.value
        }

        await authServise.register(user);

        email.value = '';
        password.value = '';
        repeatedPassword.value = '';
        
        await showNotification('User registration successful.', 'success');

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

        await showNotification('Logout successful.', 'success');

        navigate('login');
    }
    catch (e) {
        console.log(e.message);
    }
}

async function onCreateSubmit(e) {
    e.preventDefault();

    let name = document.querySelectorAll('#formAdddestination input')[0].value;
    let city = document.querySelectorAll('#formAdddestination input')[1].value;
    let duration = document.querySelectorAll('#formAdddestination input')[2].value;
    let date = document.querySelectorAll('#formAdddestination input')[3].value;
    let imgUrl = document.querySelectorAll('#formAdddestination input')[4].value;

    let error;

    if (name == '') error = 'Please fill in destination name!';
    else if (city == '') error = 'Please fill in city name!';
    else if (duration == '') error = 'Please fill in the duration!';
    else if (date == '') error = 'Please fill in the date!';
    else if (imgUrl == '') error = 'Please fill in image Url!';

    if (error) {
        await showNotification(error, 'error');

        return;
    }

    let destination = {
        creator: JSON.parse(localStorage.getItem('auth')).email,
        name,
        city,
        duration,
        date,
        imgUrl
    }

    await destinationService.create(destination);

    await showNotification('Successfully added destination!', 'success');

    navigate('home');
}

async function onEditSubmit(e, id) {
    try {
        e.preventDefault();

        const name = document.querySelectorAll('.edit-destination-form input')[0].value;
        const city = document.querySelectorAll('.edit-destination-form input')[1].value;
        const duration = document.querySelectorAll('.edit-destination-form input')[2].value;
        const date = document.querySelectorAll('.edit-destination-form input')[3].value;
        const imgUrl = document.querySelectorAll('.edit-destination-form input')[4].value;

        let error;

        if (name == '') error = 'Please fill in destination name!';
        else if (city == '') error = 'Please fill in city name!';
        else if (duration == '') error = 'Please fill in the duration!';
        else if (date == '') error = 'Please fill in the date!';
        else if (imgUrl == '') error = 'Please fill in image Url!';

        if (error) {
            await showNotification(error, 'error');

            return;
        }

        const destination = {
            creator: JSON.parse(localStorage.getItem('auth')).email,
            name, 
            city,
            duration,
            date,
            imgUrl
        }
        
        await destinationService.update(id, destination);

        await showNotification('Successfully edited destination.', 'success');

        navigate(`details/${id}`);
    }
    catch (e) {
        await showNotification(e.message, 'error');

        return;
    }
}

async function deleteDestination(e, id) {
    e.preventDefault();

    await destinationService.delete(id);

    await showNotification('Destination deleted.', 'success');

    navigate('my-destinations')
}

async function showNotification(text, type) {
    let notificationSection;

    if (type == 'error') {
        notificationSection = document.querySelector('#error-notification');
    }
    else if (type == 'success') {
        notificationSection = document.querySelector('#success-notification');
    }

    notificationSection.textContent = text;
    notificationSection.style.display = 'block';

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            notificationSection.style.display = 'none';
            resolve();
        }, 1000);
    })
}

addEventHandlers();