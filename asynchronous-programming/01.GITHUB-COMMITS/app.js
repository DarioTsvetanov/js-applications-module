async function loadCommits() {
    
    const usernameInput = document.querySelector('#username');
    const repoInput = document.querySelector('#repo');
    const ul = document.querySelector('#commits');

    const url = `https://api.github.com/repos/${usernameInput.value}/${repoInput.value}/commits`;

    /* fetch(url)
        .then(res => res.json())
        .then(data => {

            for (let key in data) { 

                ul.innerHTML += `<li>${data[key].commit.author.name}: ${data[key].commit.message}</li>`;
            }
        })
        .catch(err => ul.innerHTML = `<li>Error: ${err.status} (${err.statusText})</li>`); */

    try {
        
        ul.innerHTML = '';
        usernameInput.value = '';
        repoInput.value = '';
        
        let responce = await fetch(url);
        let data = await responce.json();

        for (let key in data) { 

            ul.innerHTML += `<li>${data[key].commit.author.name}: ${data[key].commit.message}</li>`;
        }
    }
    catch (error){

        ul.innerHTML = `<li>Error: ${error.status} (${error.statusText})</li>`;
    }
}