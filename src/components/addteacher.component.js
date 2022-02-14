import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import TeacherService from "../services/teacher.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



const lastname = value => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastname must be between 1 and 20 characters.
      </div>
    );
  }
};
const firstname = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The firstname must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const birthday = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The name must be between 3 and 20 characters.
        </div>
      );
    }
  };
  const numtph = value => {
    if (value.length < 1 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The id must be between 3 and 20 characters.
        </div>
      );
    }
  };
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

export default class addteacher extends Component {
  constructor(props) {
    super(props);
    this.handleTeacher= this.handleTeacher.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeNumTph = this.onChangeNumTph.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
   

    this.state = {
      firstname: "",
      lastname: "",
      birthday: "",
      numtph: "",
      email: "",
      successful: false,
      message: ""
    };
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeLastname(e) {
    this.setState({
     lastname: e.target.value
    });
  }
 
  onChangeBirthday(e) {
    this.setState({
      birthday: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
 
  onChangeNumTph(e) {
    this.setState({
      numtph: e.target.value
    });
  }

  handleTeacher(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        TeacherService.addTeacher(
        this.state.firstname,
        this.state.lastname,
        this.state.numtph,
        this.state.birthday,
        this.state.email
        
        

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          //this.props.history.push("/professeurs");
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          
          <Form
            onSubmit={this.handleTeacher}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstname">Nom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstname}
                    validations={[required, firstname]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">prénom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChangeLastname}
                    validations={[required, lastname]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">Date de naissance</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChangeBirthday}
                    validations={[required, birthday]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numtph">N° telephone</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="numtph"
                    value={this.state.numtph}
                    onChange={this.onChangeNumTph}
                    validations={[required, numtph]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Valider</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
