import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import EventBus from "../common/EventBus";
import ModuleService from "../services/module.service";

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

export default class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filiereid: -1,
        modulename: "",
        successful: false,
        message: ""
      };
        const { match: { params } } = this.props;
      //  console.log("id envoyé"+params.id);
    this.state.filiereid=params.id;
    this.handleModule = this.handleModule.bind(this);
    this.onChangeModulename = this.onChangeModulename.bind(this);
   // console.log("id envoyé"+this.state.filiereid);

    
  }
 
  onChangeModulename(e) {
    this.setState({
      modulename: e.target.value
    });
  }

  handleModule(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        ModuleService.addModule(
        this.state.modulename,
        this.state.filiereid
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
            onSubmit={this.handleModule}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="modulename">Nom de Module</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="modulename"
                    value={this.state.modulename}
                    onChange={this.onChangeModulename}
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
