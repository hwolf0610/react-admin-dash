import React, { Component } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CFormGroup, CInputRadio, CLabel, CInputGroup, CInputGroupAppend, CBadge } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import usersData from './UsersData'
import UserPaymentHistoryData from './UserPaymentHistoryData'


const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      userID: "",
      name: "",
      email: "",
      username: "",
      membership: "",
      DataRegistered: "",
      paymentMethod: "",
      renewDate: "",
      subscription: "",
      userEmailFix: '',
      loaderFlag: true,
      DeviceAndroid: "checked",
      DeviceApple: "false",

    }
  }

  componentDidMount = () => {
    let Device
    let { users, userID, name, email, username, membership, DataRegistered, paymentMethod, renewDate, userEmailFix, loaderFlag, subscription, DeviceAndroid, DeviceApple } = this.state;
    let url = Config.host + Config.user.User_CRUD_Url + "/" + this.props.match.params.id;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          // users = res.data.data.find(user => user.id.toString() === this.props.match.params.id)
          users = res.data.data
          if (users) {
            userID = users._id;
            name = users.displayname;
            email = users.email;
            username = users.username;
            membership = users.Membership;
            DataRegistered = users.DataRegistered;
            paymentMethod = users.PaymentMethod;
            renewDate = users.RenewDate;
            subscription = users.Subscription;
            Device = users.Device;

            // var str = "Visit W3Schools!"; 
            var n = email.search("@");
            userEmailFix = email.substr(0, n);
          }
          if (Device == "android") {
            DeviceAndroid = "checked";
            DeviceApple = "false";
          } else if (Device == "apple") {
            DeviceAndroid = "false";
            DeviceApple = "checked";
          }
          loaderFlag = false
          this.setState({ users, userID, name, email, username, membership, DataRegistered, paymentMethod, renewDate, userEmailFix, loaderFlag, subscription, DeviceAndroid, DeviceApple })
        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("error :", error);
      }
    })
  }

  onUserDelete = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.user.User_CRUD_Url + "/" + this.props.match.params.id;
            ApiService.apiCall('delete', url, {}, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this user deleted !")
                  this.props.history.push(`/users`)
                } else {
                  alert("delete request failed !")
                }
              } catch (error) {
                console.log("error:", error)
              }
            })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onCancelMembership = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to cancell this user membership?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.user.User_CRUD_Url;
            let data = { editUserID: this.state.userID, Membership: "free" }
            ApiService.apiCall('patch', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this user's membership cancelled !")
                  this.props.history.push(`/users`)
                } else {
                  alert("this request failed !")
                }
              } catch (error) {
                console.log("error:", error)
              }
            })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onUserBan = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to Ban this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.user.User_CRUD_Url;
            let data = { editUserID: this.state.userID, status: "Banned" }
            ApiService.apiCall('patch', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this user is Banned !")
                  this.props.history.push(`/users`)
                } else {
                  alert("this request failed !")
                }
              } catch (error) {
                console.log("error:", error)
              }
            })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onUserUpdate = () => {
    let { DeviceAndroid, DeviceApple } = this.state;
    let Device = (DeviceAndroid == "checked") ? "android" : "apple";
    console.log(DeviceAndroid, DeviceApple)
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to update this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.user.User_CRUD_Url;
            let data = {
              editUserID: this.state.userID,
              displayname: this.state.name,
              email: this.state.email,
              username: this.state.username,
              Membership: this.state.membership,
              Device: Device,
              DataRegistered: this.state.DataRegistered,
              PaymentMethod: this.state.paymentMethod,
              RenewDate: this.state.renewDate,
            }
            ApiService.apiCall('patch', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this user is updated !")
                  this.props.history.push(`/users`)
                } else {
                  alert("this request failed !")
                }
              } catch (error) {
                console.log("error:", error)
              }
            })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onRefoundConfirm = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  onChangeName = (e) => { this.setState({ name: e.target.value }) }
  onChangeEmail = (e) => { this.setState({ email: e.target.value }) }
  onChangeUsername = (e) => { this.setState({ username: e.target.value }) }
  onChangeMembership = (e) => { this.setState({ membership: e.target.value }) }
  onChangeDateRegistred = (e) => { this.setState({ DataRegistered: e.target.value }) }
  onChangePayment = (e) => { this.setState({ paymentMethod: e.target.value }) }
  onChangeRenewDate = (e) => { this.setState({ renewDate: e.target.value }) }
  onCheckDeviceChange = () => {
    let { DeviceAndroid, DeviceApple } = this.state;
    DeviceAndroid = DeviceAndroid == "checked" ? "false" : "checked";
    DeviceApple = DeviceApple == "checked" ? "false" : "checked";
    this.setState({ DeviceAndroid, DeviceApple })
  }

  render() {
    return (
      <div className="animated fadeIn">
        {(this.state.loaderFlag != false) &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            />
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
        <Link to="/users" >
          <span>Users</span> &nbsp;
        </Link>/ &nbsp; {this.state.name}
        <br />
        <br />
        <CRow>
          <CCol lg={6}>
            <span style={{ fontSize: '35px', fontStyle: 'boild' }}>@{this.state.userEmailFix}</span>&nbsp;<CBadge color={getBadge(this.state.subscription)}>
              {this.state.subscription}
            </CBadge>
          </CCol>
          <CCol lg={6}><CButton color="info" style={{ float: 'right' }} onClick={this.onUserUpdate}>Update User </CButton></CCol>
        </CRow><br />
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                {/* User id: {this.props.match.params.id} */}
                <h5>User information</h5>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol lg={4}>
                    <p>Full Name<br />
                      <TextField
                        fullWidth
                        // helperText="Please specify the first name"
                        label="Full Name"
                        margin="dense"
                        name="name"
                        onChange={this.onChangeName}
                        required
                        value={this.state.name}
                        variant="outlined"
                      />
                    </p>
                    <p>Email<br />
                      {/* <CInput className="form-control" id="bcc2" type="email" placeholder="Type email" value={this.state.userDetails.email} /> */}
                      <TextField
                        fullWidth
                        // helperText="Please specify the first name"
                        label="email"
                        margin="dense"
                        name="email"
                        onChange={this.onChangeEmail}
                        required
                        value={this.state.email}
                        variant="outlined"
                      />
                    </p>
                    <p>Username<br />
                      {/* <CInput className="form-control" id="bcc3" type="email" placeholder="Type username" value={this.state.userDetails.username} /> */}
                      <TextField
                        fullWidth
                        // helperText="Please specify the first name"
                        label="username"
                        margin="dense"
                        name="username"
                        onChange={this.onChangeUsername}
                        required
                        value={this.state.username}
                        variant="outlined"
                      />
                    </p>
                    <p>Membership<br />
                      <CFormGroup row>
                        <CCol md="12">
                          <CInputGroup>
                            <CInput type="email" id="input2-group2" name="input2-group2" placeholder="Membership" value={this.state.membership} onChange={this.onChangeMembership} />
                            <CInputGroupAppend>
                              <CButton type="button" color="danger" onClick={this.onCancelMembership}>Cancel</CButton>
                            </CInputGroupAppend>
                          </CInputGroup>
                        </CCol>
                      </CFormGroup>
                    </p>
                  </CCol>
                  <CCol lg={2}>
                    <p>Device</p>
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="radio1" name="radios" value="option1" checked={this.state.DeviceApple == "checked"} onChange={this.onCheckDeviceChange} />
                      <CLabel variant="checkbox" htmlFor="radio1">Apple</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="radio2" name="radios" value="option2" checked={this.state.DeviceAndroid == "checked"} onChange={this.onCheckDeviceChange} />
                      <CLabel variant="checkbox" htmlFor="radio2">Android</CLabel>
                    </CFormGroup>
                  </CCol>
                  <CCol lg={3}>
                    <p>Data Registered<br />
                      {/* <CInput className="form-control" id="bcc5" type="email" placeholder="Type DataRegistered" value={this.state.userDetails.DataRegistered} /> */}
                      <TextField
                        fullWidth
                        // helperText="Please specify the first name"
                        label="Data Registered"
                        margin="dense"
                        name="DataRegistered"
                        onChange={this.onChangeDateRegistred}
                        required
                        value={this.state.DataRegistered}
                        variant="outlined"
                      />
                    </p>
                    <p>Payment Method<br />
                      {/* <CInput className="form-control" id="bcc6" type="email" placeholder="Type paymentMethod" value={this.state.userDetails.paymentMethod} /> */}
                      <TextField
                        fullWidth
                        // helperText="Please specify the first name"
                        label="paymentMethod"
                        margin="dense"
                        name="paymentMethod"
                        onChange={this.onChangePayment}
                        required
                        value={this.state.paymentMethod}
                        variant="outlined"
                      />
                    </p>
                  </CCol>
                  <CCol lg={3}>
                    <p>Renew Date<br />
                      {/* <CInput className="form-control" id="bcc7" type="email" placeholder="Type renewDate" value={this.state.userDetails.renewDate} /> */}
                      <TextField
                        fullWidth
                        // helperText="Please specify the first name"
                        label="renewDate"
                        margin="dense"
                        name="renewDate"
                        onChange={this.onChangeRenewDate}
                        required
                        value={this.state.renewDate}
                        variant="outlined"
                      />
                    </p>
                  </CCol>
                </CRow>
                <div style={{ float: 'right' }} >
                  <CButton color="light" onClick={this.onUserDelete}>Delete User </CButton>
                  &nbsp;&nbsp;&nbsp;
                  <CButton color="danger" onClick={this.onUserBan}>Ban User </CButton>
                </div>
              </CCardBody>

            </CCard>

          </CCol>

        </CRow>
        <CRow>
          <CCol lg={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                <h5>Payment History</h5>
              </CCardHeader>
              <CCardBody>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr><td>ID</td><td>Date</td><td>Amount</td><td>status</td><td>Transaction ID</td><td></td></tr>
                  </thead>
                  <tbody>
                    {
                      UserPaymentHistoryData.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>
                            <td>{item.status}</td>
                            <td>{item.transactionId}</td>
                            <td><CButton color="info" onClick={this.onRefoundConfirm} >Refound </CButton></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}

export default withRouter(User);
// export default User;
