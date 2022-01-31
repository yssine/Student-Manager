import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/filieres/';

class FiliereService {
  getListFiliere() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addFiliere(filierename) {
    return axios.post(API_URL + "add", {
      filierename
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

export default new FiliereService();