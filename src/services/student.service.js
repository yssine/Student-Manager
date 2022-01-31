import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/students/';

class StudentService {
  getListStudent() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addStudent(firstname,lastname,filiereid,birthday,email) {
    return axios.post(API_URL + "add", {
      firstname,
      lastname,
      email,
      birthday,
      filiereid

    }, { headers: authHeader() });
  }
  update(id, firstname,lastname,filiereid,birthday,email) {
    return axios.put(API_URL +'update/${id}', 
        {id,
        firstname,
        lastname,
        filiereid,
        birthday,
        email}, 
        { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL +'delete/${id}', 
        { headers: authHeader() });
  }
  getCurrentUser(id){
    return axios.get(API_URL + 'findstudent/'+id, { headers: authHeader() });
    
  }
/*
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
}

export default new StudentService();