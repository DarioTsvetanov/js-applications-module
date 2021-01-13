function attachEvents() {
    
    const loadPostsButton = document.querySelector('#btnLoadPosts');
    const viewButton = document.querySelector('#btnViewPost');
    const section = document.querySelector('#posts');

    const url = `https://blog-apps-c12bf.firebaseio.com/`;

    loadPostsButton.addEventListener('click', () => {

        fetch(`${url}posts.json`)
        .then(res => res.json())
        .then(data => {

            section.innerHTML = '';

            for (let key in data) {

                const option = document.createElement('option');
                option.value = key;
                option.textContent = data[key].title;

                section.appendChild(option);
            }
        });
    });

    viewButton.addEventListener('click', () => {

        fetch(`${url}/posts/${section.value}.json`)
            .then(res => res.json())
            .then(data => {

                const heading = document.querySelector('#post-title');
                heading.textContent = data.title;

                const ul = document.querySelector('#post-body');
                ul.textContent = data.body;

                const postComments = document.querySelector('#post-comments');
                postComments.innerHTML = '';

                for (let key in data.comments) {

                    postComments.innerHTML += `<li>${data.comments[key].text}</li>`;
                }
            });
    })
}

attachEvents();