import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username : null,
      password : null
    }
    
  }

  postLogin() {
    return dispatch => {
        return axios({
          method: "POST",
          url: `api/auth/login/`,
          data: {
            username: this.state.username,
            password: this.state.password,
            admin: true
          },
          
        }).then(res => {
          if(res.data.success) {
            cookie().setCookie("papantulis", res.data.token,123123)
            dispatch({
                type: "AUTHORIZED",
            });
            if(this.props.auth){
              this.props.history.push("/cms")
            }
          }
          else {
            alert(res.data.message)
          }
        });
    };
  }  
  render() {
    return (
      <div className="container cms">
        <div className="row">
            <div className="col-md-12">
                <div className="card p-a-md">
                <big>LOGIN</big>
                <div className="input-group">
                    <small>username</small>
                    <input type="text" onChange={e=>{
                      this.setState({
                        username: e.target.value
                      })
                    }} />
                </div>
                <div className="input-group">
                    <small>password</small>
                    <input type="text" onChange={e=>{
                      this.setState({
                        password: e.target.value
                      })
                    }}/>
                </div>
                <button className="btn-primary" onClick={()=>{
                  this.props.dispatch(this.postLogin())
                }}>Login</button>
                
                </div>
            </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
      auth: state.authorized
    };
  }

  export default connect(mapStateToProps)(LoginPage)


