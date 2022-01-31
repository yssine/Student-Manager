import React, { Component, useState } from "react";
import axios     from "axios";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import './component.css';
import authHeader from '../services/auth-header';

import logo from "../logoinpt.png";
import add from "../add.png";
export default class Semestres extends Component {

  
  state = {

    
        semestreslist: [],
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/semestres/list', { headers: authHeader() });
        this.setState({semestreslist: results.data});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , semestresPerPage , semestreslist , loading} = this.state;
      const indexOfLastPost = currentPage * semestresPerPage;
      const indexOfFirstPost = indexOfLastPost - semestresPerPage;
      const currentsemestres = semestreslist.slice(indexOfFirstPost,indexOfLastPost);

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
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Semestres</h1>
        



        <div className="row d-flex"> 
        {this.state.semestreslist.length>=1? ( this.state.semestreslist.map((semestre, index) => (
          
       <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
           <div className="container">
            <article class="entry">
    
    <div className="entry-img">
    <img src={logo} alt="" className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      <a href={"../modules/"+semestre.id}>{semestre.semestername}</a>
    </h2>
       
    <div className="entry-content">
      
        </div>
    
    </article>
            </div>
            </div>
    ))):(
      <div></div>
      )}
    <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
           <div className="container">
            <article class="entry">
    
    <div className="image entry-img">
    <img src={add} alt="" height={80} width={80} className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      <a href={"../addsemestre/"}>Ajouter un semestre</a>
    </h2>
       
    <div className="entry-content">
      
        </div>
    
    </article>
            </div>
            </div>
</div>

    </div>
        
        </div>
    );
  }
}
