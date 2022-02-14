import React, { Component, useState } from "react";
import axios     from "axios";
import './component.css';
import './teacher.css';
import authHeader from '../services/auth-header';
import add from "../add.png";
import logo from "../logoinpt.png";
import delet from "../delete-64.png";
import edit from "../edit-64.png";


export default class Teachers extends Component {

  
  state = {

        id:"",
        teacherslist: "",
        teacherid:"",
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
     // console.log(params.id);

  
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/teachers/list/', { headers: authHeader() });
        this.setState({teacherslist: results.data});
        //console.log(results.data);
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
     

     
      

   
      return (
    <div className="container">
        <div className="tbl">
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Liste des professeurs</h1>
        



        <div className="row d-flex"> 
        <table>
        <thead >
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Date de naissance</th>
            <th>Numero de telephone</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            
        {this.state.teacherslist.length>=1? ( this.state.teacherslist.map((teacher, index) => (
           <tr >
           <td>{teacher.firstname}</td>
           <td>{teacher.lastname}</td>
           <td>{teacher.email}</td>
           <td>{teacher.birthday}</td>
           <td>{teacher.numtph}</td>
           <td><a href={"../updateteacher/"+teacher.id}><img className="icn" alt="" src={edit}></img></a></td>
           <td><a href={"../deleteteacher/"+teacher.id}><img className="icn" alt="" src={delet}></img></a></td>
           </tr>
        
      
    ))):(
      <tr><td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>no data</td>
      <td></td></tr>
    )}</tbody></table>
     
    
</div>
<div className="newc">
    <a href={"../addteacher/"}><img src={add} alt="" height={80} width={80} className="img-fluid">
  </img></a></div>




    
    </div>
    </div>
    
      )}
}
