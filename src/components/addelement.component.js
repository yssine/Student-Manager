import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import ElementService from "../services/element.service";

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
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

export default class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
        moduleid: "",
        elementname: "",
        successful: false,
        message: ""
      };
        const { match: { params } } = this.props;
      //  console.log("id envoyé"+params.id);
    this.state.moduleid=params.id;
    this.handleElement = this.handleElement.bind(this);
    this.onChangeElementname = this.onChangeElementname.bind(this);
   // console.log("id envoyé"+this.state.filiereid);

    
  }
 
  onChangeElementname(e) {
    this.setState({
      elementname: e.target.value
    });
  }

  handleElement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        ElementService.addElement(
        this.state.elementname,
        this.state.moduleid
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          
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
            onSubmit={this.handleElement}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="elementname">Nom Element</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="elementname"
                    value={this.state.elementname}
                    onChange={this.onChangeElementname}
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
