import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';

import { withRouter } from "react-router";

import { Config } from '../../../data/config';
import ApiService from '../../../services/ApiCallServices'


class Login extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      email: "",
      password: "",
    }
  }

  componentDidMount = () => {
    console.log("user_token:", localStorage.getItem('user_token'))
    let url = Config.host + Config.authentication.tokenConfirm;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          this.props.history.push("/programs/plans")
        } else {
          console.log("res_error:", res.data)
        }
      } catch (error) {
        console.log("error :", error);
      }
    })

    // let token = sessionStorage.getItem('token')
    // if(token)this.props.history.push("/programs/plans")

    // if (localStorage.getItem("accountLoginFlag") == "yes") {
    //   this.props.history.push("/programs/plans");
    // }
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value })
    // console.log("sdf" , e.target.value)
  }
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  onLogin = () => {
    let url = Config.host + Config.authentication.loginUrl
    let BodyData = { email: this.state.email, password: this.state.password };
    ApiService.apiCall('post', url, BodyData, (res) => {
      try {
        if (res.data.status == 200) {
          sessionStorage.setItem('user_token', res.data.user_token);
          sessionStorage.setItem('user_ID', res.data.data._id);
          console.log("user_token:", sessionStorage.getItem('user_token'))
          this.props.history.push('/programs/plans')
        } else {
          alert("Sorry Login failed !")
        }
      } catch (error) {
        console.log("login error :", error);
      }
    })

    // // console.log("sdf")
    // if (this.state.email == "admin" && this.state.password == "admin1") {
    //   alert("Success !")
    //   localStorage.setItem("accountLoginFlag", "yes");
    //   this.props.history.push("/programs/plans");
    // } else {
    //   alert("email or password is incorrect !")
    // }

  }
  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username" onChange={this.onEmailChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={this.onPasswordChange} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          {/* <button color="primary" className="px-4" onClick={this.onLogin}>Login</button> */}
                          <CButton color="primary" className="px-4" onClick={this.onLogin}>Login</CButton>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>If you don't have your account, please signup now</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

// export default Login;
export default withRouter(Login);
