import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AbsenceService from "../services/absence.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



const dateabsence = value => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The date must be between 1 and 20 characters.
      </div>
    );
  }
};
const nombreheures = value => {
    if (value.length < 1 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The hours must be between 1 and 20 characters.
        </div>
      );
    }
  };

 
 

export default class addabsence extends Component {
  constructor(props) {
    super(props);
    this.handleAbsence= this.handleAbsence.bind(this);
    this.onChangeNombreHeures = this.onChangeNombreHeures.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  
   

    this.state = {
      nombreheures: "",
      dateabsence: "",
      studentid: "",
      successful: false,
      message: ""
    };
    const { match: { params } } = this.props;
    //  console.log("id envoyé"+params.id);
  this.state.studentid=params.id;
   console.log("id envoyé"+this.state.studentid);
  }

  onChangeDate(e) {
    this.setState({
      dateabsence: e.target.value
    });
  }
  onChangeNombreHeures(e) {
    this.setState({
     nombreheures: e.target.value
    });
  }
 
  

  handleAbsence(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        AbsenceService.addAbsence(
        this.state.nombreheures,
        this.state.dateabsence,
        this.state.studentid
        

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
         // this.props.history.push("/etudiants");
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
            onSubmit={this.handleAbsence}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="nombreheures">nombre heures</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nombreheures"
                    value={this.state.nombreheures}
                    onChange={this.onChangeNombreHeures}
                    validations={[required, nombreheures]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dateabsence">Date d'absence</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="dateabsence"
                    value={this.state.dateabsence}
                    onChange={this.onChangeDate}
                    validations={[required, dateabsence]}
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
