const apiKey = 'AIzaSyDotpuv7zT_bO-P-5MFnULHQ7Ll0L8GPRQ';

const authServise = {
    async login(user) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }) 

        let data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        localStorage.setItem('auth', JSON.stringify(data));
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
        });
        console.log(response);
        const res = await response.json();

        if (res.error) {
            throw new Error(res.error.message);
        }
       
        return res;
    }
}

const movieService = {
    async getAll(searchText) {
        try {
            const response = await fetch('https://routing-179ca.firebaseio.com/movies.json');
            const res = await response.json();

            if (searchText) {
                return Object.keys(res).map(x => Object.assign(res[x], {id: x})).filter(x => x.title == searchText);
            }
            else {
                return Object.keys(res).map(x => Object.assign(res[x], {id: x}));
            }
        }
        catch (e) {
            return;
        }
    },
    async create(movie) {
        const response = await fetch('https://routing-179ca.firebaseio.com/movies.json', {
            method: "POST",
            body: JSON.stringify(movie)
        })

        return response;
    },
    async getOne(id) {
        const response = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`);
        const res = await response.json();

        return Object.assign(res, {id});
    },
    async update(id, movie) {
        let res = await this.getOne(id);

        res.title = movie.title;
        res.description = movie.description;
        res.imageUrl = movie.imageUrl;

        const response = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(res)
        })

        return response;
    },
    async delete(id) {
        let response = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`, {
            method: "DELETE"
        });

        return response;
    },
    async like(id) {
        let response = await this.getOne(id);
        response.likes = Number(response.likes) + 1;
        response.peopleLiked.push(JSON.parse(localStorage.getItem('auth')).email);

        const res = await fetch(`https://routing-179ca.firebaseio.com/movies/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(response)
        })

        return res;
    }
}