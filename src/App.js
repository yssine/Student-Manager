import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logoinpt.png";
import 'jquery/dist/jquery.min.js'
import '../node_modules/react-dropdown'
import AuthService from "./services/auth.service";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Addsemestre from "./components/addsemestre.component";
import Addstudent from "./components/addstudent.component";
import EventBus from "./common/EventBus";
import { history } from './helpers/history';
import Filieres from "./components/filieres.component";
import Students from "./components/student.component";
import Semestres from "./components/semestres.component";
import Annees from "./components/annee.component";
import Addannees from "./components/addannee.component";
import Addfilieres from "./components/addfiliere.component";
import Addmodules from "./components/addmodule.component";
import Addelements from "./components/addelement.component";
import DeleteStudent from "./components/deletestudent.component";
import UpdateStudent from "./components/updatestudent.component";
import Modules from "./components/modules.component";
import Elements from "./components/elements.component";
import Note from "./components/note.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_TEACHER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div className='App'>
          <ul className="ul1">
            <li><a target='_blank' href='https://www.inpt.ac.ma/en'><img alt="" src={logo}/></a></li>
            <li><a href="/home" className="lnk">Home</a></li>
            <li><a href={"/filieres/"}className="lnk">Filieres</a></li>
            <li><a href={"/semestres/"}className="lnk">Semestres</a></li>	
            <li><a href={"/annees/"}className="lnk">Années Universitaire</a></li>
            <li><a href={"/etudiants/"}className="lnk">Etudiants</a></li>	
            <li><a href={"/professeurs/"}className="lnk">Professeurs</a></li>
          </ul>
          {currentUser ? ( 
                <div className="ul2" >
                    <a href="/profile" className="lnk1">{currentUser.username}</a>
                    <a href="/" onClick={this.logOut}className="lnk1">Logout</a>
                </div>):
                (<div className="ul2">
                  <a href="/login" className="lnk1">Login</a>
                  <a href="/register"className="lnk1">Register</a>	
                </div>	)}
        </div>
        <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/filieres" component={Filieres} />
            <Route exact path="/etudiants" component={Students} />
            <Route exact path="/semestres" component={Semestres} />
            <Route exact path="/annees" component={Annees} />
            <Route exact path="/modules" component={Modules} />
            <Route exact path="/elements" component={Elements} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/addfiliere" component={Addfilieres} />
            <Route exact path="/addmodule" component={Addmodules} />
            <Route exact path="/addelement" component={Addelements} />
            <Route exact path="/addsemestre" component={Addsemestre} />
            <Route exact path="/addstudent" component={Addstudent} />
            <Route exact path="/addannee" component={Addannees} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/filieres" render={({ match }) => (<Filieres match={match} />)} /> 
            <Route exact path="/modules/:id" render={({match }) => (<Modules match={match} />)} />
            <Route exact path="/addmodule/:id" render={({ match }) => (<Addmodules match={match} />)} />
            <Route exact path="/deletestudent/:id" render={({ match }) => (<DeleteStudent match={match} />)} />
            <Route exact path="/update/:id" render={({ match }) => (<UpdateStudent match={match} />)} />
            <Route exact path="/addelement/:id" render={({ match }) => (<Addelements match={match} />)} />
            <Route exact path="/elements/:id" render={({ match }) => (<Elements match={match} />)} />
            <Route exact path="/note/:id" render={({ match }) => (<Note match={match} />)} />
          </Switch>
      </Router>
    );
  }
}



export default App;