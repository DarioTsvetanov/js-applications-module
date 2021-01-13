const apiKey = 'AIzaSyDotpuv7zT_bO-P-5MFnULHQ7Ll0L8GPRQ'

const authServise = {
    async login(email, password) {
        try {
            let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }) 

            let data = await response.json();
            localStorage.setItem('auth', JSON.stringify(data));
        }
        catch (e) {}
    },
    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email || ''
            }
        }
        catch (e) {
            return {
                isAuthenticated: false,
                email: ''
            }
        }
    },
    logout() {
        localStorage.setItem('auth', '');
    },
    async register(data) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res = await response.json();

        return res;
    }
}

const movieService = {
    async add(movieData) {
        const response = await fetch('https://routing-179ca.firebaseio.com/movies.json', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(movieData)
        });
        
        return await response.json();
    },
    async getAll() {
        try {
            const response = await fetch('https://routing-179ca.firebaseio.com/movies.json');
            const data = await response.json();
            console.log(data);

            return Object.keys(data).map(key => ({key, ...data[key]}));
        }
        catch (e) {

            return;
        }
    },
    async getMovieDetails(id) {
        const response = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`);
        const res = await response.json();

        return res;
    },
    async delete(id) {
        const response = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`, {
            method: "DELETE"
        })

        return response;
    },
    async edit(id, movieObj) {
        const response = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(movieObj)
        })

        return response;
    }
}