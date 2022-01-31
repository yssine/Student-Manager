import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import SemestreService from "../services/semestre.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



const vusername = value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 2 and 20 characters.
      </div>
    );
  }
};

export default class Semestre extends Component {
  constructor(props) {
    super(props);
    this.handleSemestre= this.handleSemestre .bind(this);
    this.onChangeSemestrename = this.onChangeSemestrename.bind(this);
   

    this.state = {
      semestername: "",
      successful: false,
      message: ""
    };
  }

  onChangeSemestrename(e) {
    this.setState({
      semestername: e.target.value
    });
  }

  handleSemestre(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        SemestreService.addSemestre(
        this.state.semestername
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/semestres");
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
            onSubmit={this.handleSemestre}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="semestername">Nom de filière</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="semestername"
                    value={this.state.semestername}
                    onChange={this.onChangeSemestrename}
                    validations={[required, vusername]}
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
