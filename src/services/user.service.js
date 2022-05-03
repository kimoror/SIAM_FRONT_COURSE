import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_BACKEND_URL + 'user/';

class UserService{
    
    addInfo(userInfo){
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

    getInfo(){
        return axios.get(API_URL + 'getInfo', {
            headers: authHeader()
        })
    }

    getInfoById(userId){
        return axios.get(API_URL + 'getInfoById/' + userId,{
            headers: authHeader()
        })
    }

    getAllResumes(){
        return axios.get(API_URL + 'getAllResumeNameByEmail', {
            headers: authHeader()}
        )
    }

    deleteResumeById(resumeName){
        return axios.delete(API_URL + 'deleteResume/' + resumeName, {headers: authHeader()})
    }

    getResumeByName(resumeName){
        return axios.get(API_URL + 'getResume?resumeName=' + resumeName, {headers: authHeader(), responseType: "blob"})
          .then(response => {
            const blob = new Blob([response.data], { type: "application/pdf" })
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = resumeName;
            link.click();
            URL.revokeObjectURL(link.href);
        })
    }

    getLastResumeByEmail(email){
        return axios.get(API_URL + 'getLastResume/' + email, {responseType: "blob"})
    }
}

export default new UserService();