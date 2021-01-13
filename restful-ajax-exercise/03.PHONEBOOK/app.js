function attachEvents() {

    const loadButton = document.querySelector('#btnLoad');
    loadButton.addEventListener('click', loadContacts);
    
    const createButton = document.querySelector('#btnCreate');

    createButton.addEventListener('click', createContact);
}

function loadContacts() {

    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    fetch(url)
            .then(response => response.json()
            .then(data => {

                for (let key in data) {

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'DELETE';
                    deleteButton.addEventListener('click', () => {

                        let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;

                        fetch(deleteUrl, { method: "DELETE" });
                    });

                    const newLi = document.createElement('li');
                    newLi.textContent = `${data[key].person}: ${data[key].phone}`;
                    newLi.appendChild(deleteButton);
                    
                    document.querySelector('#phonebook').appendChild(newLi);
                }
            })
        );
}

function createContact() {

    const personInput = document.querySelector('#person');
    const phoneInput = document.querySelector('#phone');

    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    let personObj = {
        person: personInput.value,
        phone: phoneInput.value
    }

    fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(personObj)
    });
}
attachEvents();