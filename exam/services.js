const apiKey = 'AIzaSyCpZaaAidWG2AlHinj41_V7MM-QmNlT9Og';

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
    async register(user) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        
        const res = await response.json();

        if (res.error) {
            throw new Error(res.error.message);
        }

        this.login(user);

        return res;
    }
}

const destinationService = {
    async create(data) {
        let response = await fetch('https://exam-8153b-default-rtdb.firebaseio.com/destinations.json', {
            method: "POST",
            body: JSON.stringify(data)
        });

        let res = await response.json();
        return res;
    },
    async getAll(token) {
        try {
            const response = await fetch('https://exam-8153b-default-rtdb.firebaseio.com/destinations.json');
            const res = await response.json();

            if (token) {
                let creator = JSON.parse(localStorage.getItem('auth')).email;
                
                return Object.keys(res).map(x => Object.assign(res[x], {id: x})).filter(x => x.creator == creator);
            }
            else {
                return Object.keys(res).map(x => Object.assign(res[x], {id: x}));
            }
        }
        catch (e) {
            return;
        }
    },
    async getOne(id) {
        const response = await fetch(`https://exam-8153b-default-rtdb.firebaseio.com/destinations/${id}.json`);
        const res = await response.json();

        return Object.assign(res, {id});
    },
    async update(id, destination) {
        let res = await this.getOne(id);

        res.name = destination.name;
        res.city = destination.city;
        res.duration = destination.duration;
        res.date = destination.date;
        res.imgUrl = destination.imgUrl;

        const response = await fetch(`https://exam-8153b-default-rtdb.firebaseio.com/destinations/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(destination)
        })

        const data = await response.json();

        return data;
    },
    async delete(id) {
        const response = await fetch(`https://exam-8153b-default-rtdb.firebaseio.com/destinations/${id}.json`, {
            method: "DELETE"
        });

        return response;
    }
}