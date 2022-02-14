import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/teachers/';

class TeacherService {
  getListTeachers() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addTeacher(firstname,lastname,numtph,birthday,email) {
    return axios.post(API_URL + "add", {
      firstname,
      lastname,
      email,
      birthday,
      numtph

    }, { headers: authHeader() });
  }
  update(firstname,lastname,numtph,birthday,email,id) {
    return axios.put(API_URL +'update', 
        {
        firstname,
        lastname,
        numtph,
        birthday,
        email,
        id}, 
        { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL +'delete/${id}', 
        { headers: authHeader() });
  }
  getCurrentUser(id){
    return axios.get(API_URL + 'findteacher/'+id, { headers: authHeader() });
    
  }
  
}

export default new TeacherService();