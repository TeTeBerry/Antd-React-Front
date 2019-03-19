import decode from 'jwt-decode';
export default class AuthService {
    //Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:3000'//API service domain
        
    }
}