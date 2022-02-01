import React, { Component, useState } from "react";
import axios     from "axios";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import './component.css';
import authHeader from '../services/auth-header';

import logo from "../logoinpt.png";
import add from "../add.png";
import Table from "../components/Table.component"
export default class Students extends Component {

  
  state = {

    
        studentslist: [],
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/students/list', { headers: authHeader() });
        this.setState({studentslist: results.data});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , studentsPerPage , studentslist , loading} = this.state;
      const indexOfLastPost = currentPage * studentsPerPage;
      const indexOfFirstPost = indexOfLastPost - studentsPerPage;
      const currentstudents = studentslist.slice(indexOfFirstPost,indexOfLastPost);

      const paginate = pageNum => {
        this.setState({currentPage : pageNum});
        this.myRef.scrollIntoView({ behavior: 'smooth', block: 'start' });

      }
      const nextPage = () => {
        this.setState({currentPage:currentPage+1});
        this.myRef.scrollIntoView({ behavior: 'smooth', block: 'start' });

      }
      const prevPage = () => {
        this.setState({currentPage:currentPage+1});
        this.myRef.scrollIntoView({ behavior: 'smooth', block: 'start' });


      }
      

   
      return (
    <div>
        <div className="container">
        <Table data={this.state.studentslist} rowsPerPage={9} />
        </div>
    <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
    <div className="container">
    <article class="entry">
    
    <div className="image entry-img">
    <img src={add} alt="" height={80} width={80} className="img-fluid">
    </img>
    </div>
    
    <h2 className="entry-title">
      <a href={"../addstudent/"}>Ajouter un nouveau etudiant</a>
    </h2>
       
    <div className="entry-content">
      
        </div>
    
    </article>
            </div>
            </div>


    </div>
        
        
   
      );
}
}
