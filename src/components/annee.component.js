import React, { Component, useState } from "react";
import axios     from "axios";
import './component.css';
import authHeader from '../services/auth-header';

import logo from "../logoinpt.png";
import add from "../add.png";
export default class Annees extends Component {

  
  state = {

    
        anneeslist: [],
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/annees/list', { headers: authHeader() });
        this.setState({anneeslist: results.data});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , anneesPerPage , anneeslist , loading} = this.state;
      const indexOfLastPost = currentPage * anneesPerPage;
      const indexOfFirstPost = indexOfLastPost - anneesPerPage;
      const currentannees = anneeslist.slice(indexOfFirstPost,indexOfLastPost);

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
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Années universitaires</h1>
        



        <div className="row d-flex"> 
        {this.state.anneeslist.length>=1? ( this.state.anneeslist.map((annee, index) => (
          
       <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
           <div className="container">
            <article class="entry">
    
    <div className="entry-img">
    <img src={logo} alt="" className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      {annee.anneename}
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
      <a href={"../addannee/"}>Ajouter une Année universitaire</a>
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
