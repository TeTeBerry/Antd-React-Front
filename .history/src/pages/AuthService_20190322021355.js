import decode from 'jwt-decode';
export default class AuthService {
    //Initializing important variables
    constructor(domain) {
        this.domain = domain || "http://localhost:4000"//API service domain
    }
    login = (username, password) => {
        return this.fetch(`${this.domain}/users/authenticate`,{
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token);//Setting the token in localStorage
            return Promise.resolve(res);
        });
    };

    loggedIn = () => {
        //Checks if there is a saved token
        const token = this.getToken();//Getting token from localStorage
        return !!token && this.isTokenExpired(token);
    };
    
    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000){
                //Checking if token is expired.
                return true;
            }else return false;
        }catch(err) {
            console.log("expired check failed!");
            return false;
        }
    };

    setToken = idToken => {
        //Saves user token to localStorage
        localStorage.setItem("id_token",idToken);
    };

    getToken = () => {
        //Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    };
    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }


    getConfirm = () => {
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
    };
    fetch = (url, options) => {
        //performs api calls sending the required authentication headers
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        //Setting Authorization header
        //Authorization Bear xxxxxxxx.xxxxxxx
        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer" + this.getToken();
        }
        
        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json());
    };

    _checkStatus = response => {
        //raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            //Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

}