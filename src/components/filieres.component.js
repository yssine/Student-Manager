import React, { Component, useState } from "react";
import axios     from "axios";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import './component.css';
import authHeader from '../services/auth-header';

import logo from "../logoinpt.png";
import add from "../add.png";
export default class Filieres extends Component {

  
  state = {

    
        filiereslist: [],
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/filieres/list', { headers: authHeader() });
        this.setState({filiereslist: results.data});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , filieresPerPage , filiereslist , loading} = this.state;
      const indexOfLastPost = currentPage * filieresPerPage;
      const indexOfFirstPost = indexOfLastPost - filieresPerPage;
      const currentfilieres = filiereslist.slice(indexOfFirstPost,indexOfLastPost);

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
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Filieres</h1>
        



        <div className="row d-flex"> 
        {this.state.filiereslist.length>=1? ( this.state.filiereslist.map((filiere, index) => (
          
       <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
           <div className="container">
            <article class="entry">
    
    <div className="entry-img">
    <img src={logo} alt="" className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      <a href={"../modules/"+filiere.id}>{filiere.filierename}</a>
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
      <a href={"../addfiliere/"}>Ajouter une filiere</a>
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
