import React, { Component, useState } from "react";
import axios     from "axios";
import './component.css';
import authHeader from '../services/auth-header';
import add from "../add.png";
import logo from "../logoinpt.png";
export default class Absences extends Component {

  
  state = {

        id:"",
        moyenne:"",
        noteslist: "",
        studentid:"",
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
     // console.log(params.id);

   this.state.studentid=params.id;
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/absences/list/'+params.id, { headers: authHeader() });
        this.setState({noteslist: results.data});
        console.log(this.state.noteslist);
        
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
     

     
      

   
      return (
    <div>
        <div className="container">
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Historique des absences non justifiées</h1>
        



        <div className="row d-flex"> 
        <table>
        <thead >
          <tr>
            <th>Date</th>
            <th>Nombre heures</th>
            <th>Observation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            
        {this.state.noteslist.length>=1? ( this.state.noteslist.map((note, index) => (
           <tr >
           <td>{note.dateabsence}</td>
           <td>{note.nombreheures}</td>
           <td>{note.observation}</td>
           <td><a href={"../updateabsence/"+note.id}>Modifier</a></td>
           </tr>
      
    ))):(
      <div></div>
    )}</tbody></table>
     
    
</div>
<div className="container">
            <article className="entry">
    
    <div className="image entry-img">
    <img src={add} alt="" height={80} width={80} className="img-fluid">
  </img>
    </div>
    
    <h2 className="entry-title">
      <a href={"../addabsence/"+this.state.studentid}>Ajouter une absence</a>
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
