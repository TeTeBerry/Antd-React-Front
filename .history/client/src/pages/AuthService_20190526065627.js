import decode from 'jwt-decode';
import qs from 'querystring'; 

export default class AuthService {
    //Initializing important variables
    constructor(domain) {
        this.domain = domain || "http://localhost:8080/iot"//API service domain
    }
    login = (userName, password) => {
        return this.fetch(`${this.domain}/admin/login`,{
            method: "POST",
            body: JSON.stringify({
                userName,
                password
            })
        }).then(res => {
            this.setToken(res.data.msg);//Setting the token in localStorage
            this.setUserName(res.data.userName);
            console.log(this.getToken());
            console.log(this.getUserName());
            return Promise.resolve(res);
        });
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    
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
    
    setUserName = userName => {
        localStorage.setItem("user_name",userName);
    };

    getUserName = () => {
        return localStorage.getItem('user_name')
    }

    setToken = idToken => {
        //Saves user token to localStorage
        localStorage.setItem("id_token",idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = this.getToken();
        console.log("Recieved answer!");
        return answer;
    }

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