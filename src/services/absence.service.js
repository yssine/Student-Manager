import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://inptstudentmanagement.herokuapp.com/api/absences/';

class AbsenceService {
  

  addAbsence(nombreheures,dateabsence,studentid) {
    return axios.post(API_URL + "add", {
      nombreheures,
      dateabsence,
      studentid

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
 

}

export default new AbsenceService();