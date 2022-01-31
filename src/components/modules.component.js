import React, { Component, useState } from "react";
import axios     from "axios";
import './component.css';
import authHeader from '../services/auth-header';
import add from "../add.png";
import logo from "../logoinpt.png";
export default class Modules extends Component {

  
  state = {

        id:"",
        moduleslist: [],
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/modules/list/'+params.id, { headers: authHeader() });
        this.setState({moduleslist: results.data});
        this.setState({id: params.id});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , modulesPerPage , moduleslist , loading} = this.state;
      const indexOfLastPost = currentPage * modulesPerPage;
      const indexOfFirstPost = indexOfLastPost - modulesPerPage;
      const currentmodules = moduleslist.slice(indexOfFirstPost,indexOfLastPost);

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
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Modules</h1>
        



        <div className="row d-flex"> 
        {this.state.moduleslist.length>=1? ( this.state.moduleslist.map((module, index) => (
          
       <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
           <div className="container">
            <article class="entry">
    
    <div className="entry-img">
    <img src={logo} alt="" className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      <a href={"../elements/"+module.id}>{module.modulename}</a>
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
      <a href={"../addmodule/"+this.state.id}>Ajouter un module</a>
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
