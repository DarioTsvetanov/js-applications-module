function attachEvents() {
    
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';

    const submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', () => { submitMessage(url) });

    const refreshButton = document.querySelector('#refresh');
    refreshButton.addEventListener('click', () => { refreshFeed(url) });
}

function submitMessage(url) {

    const nameInput = document.querySelector('#author');
    const contentInput = document.querySelector('#content');

    fetch(url, {
        method: "POST",
        body: JSON.stringify({ author: nameInput.value, content: contentInput.value})
    });
}

function refreshFeed(url) {

    const messagesArea = document.querySelector('#messages');

    messagesArea.textContent = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {

            for (let key in data) {

                messagesArea.innerHTML += `${data[key].author}: ${data[key].content}\n`;
            }
        })
}

attachEvents();