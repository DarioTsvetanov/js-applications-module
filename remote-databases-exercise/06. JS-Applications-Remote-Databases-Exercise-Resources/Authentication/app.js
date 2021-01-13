const auth = firebase.auth();

document.querySelector('#create-button').addEventListener('click', createAccount);
document.querySelector('#already-have-account-text').addEventListener('click', signInPageRedirect);
document.querySelector('#sign-in-button').addEventListener('click', signInAccount);
document.querySelector('#sign-out-button').addEventListener('click', signOut);

async function createAccount(e) {

    try {
        const emailInput = document.querySelector('#register-email-wrapper input');
        const passwordInput = document.querySelector('#register-password-wrapper input');

        if (emailInput.value == '' || passwordInput.value == '') return;

        await auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        
        const h2 = document.createElement('h2');
        h2.textContent = 'Account creation successful!';
        document.querySelector('#login-form').prepend(h2);

        document.querySelector('#login-form').style.display = 'block';
        e.target.parentElement.style.display = 'none';
    }
    catch (e) {
        document.querySelector('#error').textContent = `${e.message}`;
        document.querySelector('#error').style.display = 'block';
    }
}

function signInPageRedirect(e) {

    e.preventDefault();

    document.querySelector('#login-form').style.display = 'block';
    e.target.parentElement.style.display = 'none';
}

async function signInAccount(e) {

    try {
        const emailInput = document.querySelector('#email-wrapper input');
        const passwordInput = document.querySelector('#password-wrapper input');

        if (emailInput.value == '' || passwordInput.value == '') return;

        await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);

        document.querySelector('#logged-wrapper h2').textContent = `Hello ${emailInput.value}!`;
        document.querySelector('#logged-wrapper').style.display = 'block';
        e.target.parentElement.style.display = 'none';

        emailInput.value = '';
        passwordInput.value = '';
    }
    catch (e) {
        document.querySelector('#sign-in-error').textContent = e.message;
    }
}

async function signOut() {

    try {
        await auth.signOut();

        document.querySelector('#logged-wrapper').style.display = 'none';
        document.querySelector('#registration-form').style.display = 'block';
    }
    catch {
        
    }
}