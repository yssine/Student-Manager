import React, { Component, useState } from "react";
import axios     from "axios";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import './component.css';
import authHeader from '../services/auth-header';
import add from "../add.png";
import logo from "../logoinpt.png";
export default class Elements extends Component {

  
  state = {

    
        elementslist: [],
        id:"",
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/elements/list/'+params.id, { headers: authHeader() });
        this.setState({elementslist: results.data});
        this.setState({id: params.id});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , elementsPerPage , elementslist , loading} = this.state;
      const indexOfLastPost = currentPage * elementsPerPage;
      const indexOfFirstPost = indexOfLastPost - elementsPerPage;
      const currentelements = elementslist.slice(indexOfFirstPost,indexOfLastPost);

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
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Elements de Module</h1>
        



        <div className="row d-flex"> 
        {this.state.elementslist.length>=1? ( this.state.elementslist.map((element, index) => (
          
       <div className="blog col-md-4 flex-column d-flex align-items-stretch">
           
           <div className="container">
            <article class="entry">
    
    <div className="entry-img">
    <img src={logo} alt="" className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      <a href={""}>{element.elementname}</a>
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
      <a href={"../addelement/"+this.state.id}>Ajouter element</a>
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
