import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./profile.css"
import pdp from "../pdp.png"


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>

        <div className="imb">
        
          <div className="sl">
            <input className="upload" type="file" accept="image/png, image/jpeg" placeholder="Photo"/>
            <img className="pp" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
            <img className="pps" src={pdp}/>
          </div>
          
          
        </div>
        <div className="txt">
          <h3>
            <strong>{currentUser.username}</strong>'s Profile
          </h3>
          <h3>
            <strong>Id :</strong>{" "}
            {currentUser.id} {currentUser.prenom}
          </h3>
          <h3>
            <strong>Email :</strong>{" "}
            {currentUser.email}
          </h3>
        </div>
        </div>: null}
      </div>
    );
  }
}
