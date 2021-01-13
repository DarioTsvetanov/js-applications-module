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
        try {
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
        catch (e) {}
    }
}

const shoeService = {
    async getAll() {
        try {
            const response = await fetch('https://routing-179ca.firebaseio.com/shoes.json')
            const res = await response.json();
            
            let shoesArray = Object.keys(res).map(key => ({key, ...res[key]}));
            return shoesArray;
        }
        catch (e) {
            return;
        }
    },
    async create(data) {
        let response = await fetch('https://routing-179ca.firebaseio.com/shoes.json', {
            method: "POST",
            body: JSON.stringify(data)
        });
        
        return response;
    },
    async getOne(id) {
        const response = await fetch(`https://routing-179ca.firebaseio.com/shoes/${id}.json`);
        const res = await response.json();

        return res;
    },
    async delete(id) {
        await fetch(`https://routing-179ca.firebaseio.com/shoes/${id}.json`, { method: "DELETE"});

        return;
    }, 
    async edit(shoeObj, id) {
        let getResponse = await fetch(`https://routing-179ca.firebaseio.com/shoes/${id}.json`);
        let getData = await getResponse.json();

        shoeObj.boughtTimes = getData.boughtTimes;
        shoeObj.creator = getData.creator;
        shoeObj.peopleBoughtIt = getData.peopleBoughtIt
        
        const postResponse = await fetch(`https://routing-179ca.firebaseio.com/shoes/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(shoeObj)
        });

        return postResponse;
    },
    async buy(id) {
        let response = await shoeService.getOne(id);
        response.boughtTimes = Number(response.boughtTimes) + 1;
        response.peopleBoughtIt.push(JSON.parse(localStorage.getItem('auth')).email);
        
        let responsePost = await fetch(`https://routing-179ca.firebaseio.com/shoes/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(response)
        })
        
        return responsePost;
    }
}