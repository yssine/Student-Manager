import React, { Component, useState } from "react";
import axios     from "axios";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import './component.css';
import authHeader from '../services/auth-header';

import logo from "../logoinpt.png";
import add from "../add.png";
import { Link } from "react-router-dom";
export default class DeleteStudent extends Component {

  
  state = {

    
        loading : false,
        result: ""
        

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.delete('https://inptstudentmanagement.herokuapp.com/api/students/delete/'+params.id, { headers: authHeader() });
        this.setState({result: results.data});
        this.setState({loading : false});

        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { result, loading} = this.state;
     

    
      

   
      return (
    <div>
        <div className="container">
     
            <Link
                to={"/etudiants/"}
                className="badge badge-warning"
              >
               Retour à la liste des etudiants
              </Link>
    </div>
        
        </div>
    );
  }
}
