import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardGroup
} from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';
import { withRouter } from "react-router";

import { Config } from '../../../data/config';
import ApiService from '../../../services/ApiCallServices'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",

    }
  }

  onRegister = () => {
    let { email, username, password } = this.state;
    let url = Config.host + Config.authentication.signupUrl;
    let BodyData = {username: username, email:email, password:password}
    ApiService.apiCall('post', url, BodyData, (res)=>{
      if(res.data.status == 200){
        sessionStorage.setItem('user_token', res.data.user_token);
        sessionStorage.setItem('user_ID', res.data.data._id);
        this.props.history.push('/programs/plans')
      }else{
        alert("Sorry Signup failed !")
      }
    })
    console.log(email, username, password)
    // this.props.history.push("/login");
  }
  onUsernameChange = (e) => { this.setState({ username: e.target.value }) }
  onEmailChange = (e) => { this.setState({ email: e.target.value }) }
  onPasswordChange = (e) => { this.setState({ password: e.target.value }) }
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
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username" onChange={this.onUsernameChange} />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>@
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Email" autoComplete="Email" onChange={this.onEmailChange} />
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
                        <CCol xs="12">
                          {/* <button color="primary" className="px-4" onClick={this.onLogin}>Login</button> */}
                          <CButton color="primary" className="px-4" onClick={this.onRegister}>Create Account</CButton>
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
                      <h2>Login</h2>
                      <p>Do you have already account?</p>
                      <Link to="/login">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Login Now!</CButton>
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

// export default Register;
export default withRouter(Register);

