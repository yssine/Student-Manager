import React, { Component, useState } from "react";
import axios     from "axios";
import './component.css';
import authHeader from '../services/auth-header';
import add from "../add.png";
import logo from "../logoinpt.png";
export default class Notes extends Component {

  
  state = {

        id:"",
        moyenne:"",
        noteslist: [],
        loading : false,
        currentPage : 1,
        coursesPerPage :9

  };
 

  componentDidMount() {
      const { match: { params } } = this.props;
      console.log(params.id);

   
    


       const getPosts = async () => {
        this.setState({loading : true});
        const results = await axios.get('https://inptstudentmanagement.herokuapp.com/api/notes/bulletin/'+params.id, { headers: authHeader() });
        this.setState({noteslist: results.data});
        const results1 = await axios.get('https://inptstudentmanagement.herokuapp.com/api/notes/moyenne/'+params.id, { headers: authHeader() });
        this.setState({moyenne: results1.data});
        this.setState({id: params.id});
        this.setState({loading : false});
        
      };
      
      getPosts();
   
  }

  render() {
    const { params} = this.props;  
    
      const { currentPage , notesPerPage , noteslist , loading} = this.state;
      const indexOfLastPost = currentPage * notesPerPage;
      const indexOfFirstPost = indexOfLastPost - notesPerPage;
      const currentnotes = noteslist.slice(indexOfFirstPost,indexOfLastPost);

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
        <h1 ref={ (ref) => this.myRef=ref } className="my-5 text-primary text-center" >Resultats</h1>
        



        <div className="row d-flex"> 
        <table>
        <thead >
          <tr>
            <th>Module</th>
            <th>Element</th>
            <th>Note</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
        {this.state.noteslist.length>=1? ( this.state.noteslist.map((note, index) => (
           <tr >
           <td>{note.modulename}</td>
           <td>{note.elementname}</td>
           <td>{note.note}</td>
           <td>{note.observation}</td>
           </tr>
      
    ))):(
      <div></div>
    )}</tbody></table>
     <div className="container">
            <article class="entry">
    
     <h2 className="entry-title">
      Moyenne Generale:  {this.state.moyenne}
    </h2></article>
    </div>
    
</div>

    </div>
        
        </div>
    );
  }
}
