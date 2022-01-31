import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/modules/';

class ModuleService {
  getListModule() {
    return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  addModule(modulename,filiereid) {
    return axios.post(API_URL + "add", {
      modulename,
      filiereid
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

export default new ModuleService();