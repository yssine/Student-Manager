import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/annees/';

class AnneeService {
  getListAnnee() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addAnnee(anneename) {
    return axios.post(API_URL + "add", {
        anneename
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

export default new AnneeService();