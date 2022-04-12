import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_BACKEND_URL + 'user/';

class UserService{
    getPublicContent(){
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getModeratorBoard(){
        return axios.get(API_URL+'mod', {headers: authHeader()});
    }

    getAdminBoard(){
        return axios.get(API_URL+'admin', {headers: authHeader()});
    }
    
    addInfo(userInfo){
        console.log(
            "name",
            userInfo.name,
            "midname",
            userInfo.middleName,
            userInfo.surname,
            userInfo.birthday,
            userInfo.address,
            userInfo.status,
            userInfo.company_id,
            userInfo.workPosition,
            userInfo.education,
            userInfo.school,
            userInfo.university,
            userInfo.phoneNumber
        )
        return axios.post(API_URL+'addInfo', {
            name: userInfo.name,
            middleName: userInfo.middleName,
            surname: userInfo.surname,
            birthday: userInfo.birthday,
            address: userInfo.address,
            status: userInfo.status,
            company_id: userInfo.company_id,
            workPosition: userInfo.workPosition,
            education: userInfo.education, 
            school: userInfo.school, 
            university: userInfo.university,
            phoneNumber: userInfo.phoneNumber
        }, 
        {headers: authHeader()});
    }

    uploadResume(resumeArray){
        const formData = new FormData()
        formData.append('file', resumeArray, resumeArray.name)
        return axios.post(
            API_URL + 'uploadResume',
            formData, {
                headers: authHeader(),
                params: {resumeName: resumeArray.name}
        });
    }

    getResumeLinks(){

    }
}

export default new UserService();