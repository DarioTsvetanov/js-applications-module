const apiKey = 'AIzaSyDotpuv7zT_bO-P-5MFnULHQ7Ll0L8GPRQ';

const authServise = {
    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }) 
        
        if (response.status !== 200) throw new Error('Wrong email or password.');

        let data = await response.json();

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

        const res = await response.json();
        return res;
    }
}

const articleService = {
    async getAll() {
        try {
            const response = await fetch('https://routing-179ca.firebaseio.com/articles.json');
            const res = await response.json();

            return Object.keys(res).map(x => Object.assign(res[x], {id: x}));
        }
        catch (e) {
            return;
        }
    }
}