import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/semestres/';

class SemestreService {
  getListSemestre() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addSemestre(semestername) {
    return axios.post(API_URL + "add", {
        semestername
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

export default new SemestreService();