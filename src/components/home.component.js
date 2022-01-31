import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="App-header">
        <h1>Welcome to INPT Students Manager</h1>
        <h2 className="title">Overview</h2>
        <p>INPT Students Manager is an app developped by some Smart-ICT engineering Students
        in order to manage the school's different feilds.<br/><br/>
        You are now looking at the web version of the app. There is also a mobile version of it, 
        the link will be included soon.
        </p>
    </div>
    );
  }
}
