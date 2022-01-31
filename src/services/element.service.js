import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/elements/';

class ElementService {
  getListModule() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addElement(elementname,moduleid) {
    return axios.post(API_URL + "add", {
      elementname,
      moduleid
    }, { headers: authHeader() });
  }
/*
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
}

export default new ElementService();