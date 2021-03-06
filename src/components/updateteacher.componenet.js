import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import StudentService from "../services/teacher.service";

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
          num telephone must be between 3 and 20 characters.
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
    this.handleStudent= this.handleStudent.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeFiliere = this.onChangeFiliere.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getStudent = this.getStudent.bind(this);
   

    this.state = {
      firstname: "",
      id:"",
      lastname: "",
      birthday: "",
      numtph: "",
      email: "",
      successful: false,
      message: "",
      currentUser: { firstname: "",email:"" }
    };
   
  }
  componentDidMount() {
    this.getStudent(this.props.match.params.id);
    this.id=this.props.match.params.id;
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
 
  onChangeFiliere(e) {
    this.setState({
      numtph: e.target.value
    });
  }

  handleStudent(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        StudentService.update(
        this.state.firstname,
        this.state.lastname,
        this.state.numtph,
        this.state.birthday,
        this.state.email,
        this.state.id  

        

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/etudiants");
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
  getStudent(id) {
    StudentService.getCurrentUser(id)
      .then(response => {
        this.setState({
          currentUser: response.data
          
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentUser } = this.state;
    {console.log(currentUser)}
    return (
      <div className="col-md-12">
        <div className="card card-container">
          
          <Form
            onSubmit={this.handleStudent}
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
                    value={currentUser.firstname}
                    onChange={this.onChangeFirstname}
                    validations={[required, firstname]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">pr??nom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.currentUser.lastname}
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
                    value={this.state.currentUser.birthday}
                    onChange={this.onChangeBirthday}
                    validations={[required, birthday]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numtph">N?? Telephone</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="numtph"
                    value={this.state.currentUser.numtph}
                    onChange={this.onChangeFiliere}
                    validations={[required, numtph]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.currentUser.email}
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
