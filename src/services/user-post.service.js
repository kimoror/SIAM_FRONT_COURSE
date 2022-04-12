import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_BACKEND_URL + 'post/';

class UserPostService {
    createPost(post){
        return axios.post(API_URL + 'create',
            {
                text: post.text
            },
            {headers: authHeader()});
    }

    getAllPosts(){
        return axios.get(API_URL + 'getAllPosts', {headers: authHeader()})
    }
}

export default new UserPostService();