import axios from "axios";

const API_URL = process.env.VUE_APP_BACKEND_URL + 'auth/'

class AuthService{
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.params.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.params));
                }

                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();