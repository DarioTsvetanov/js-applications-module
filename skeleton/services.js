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