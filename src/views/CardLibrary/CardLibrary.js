import React, { Component } from 'react';
import { CForm, CDataTable, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CInput, CFormGroup, CLabel, CSelect } from '@coreui/react';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { Config } from '../../data/config';
import ApiService from '../../services/ApiCallServices'
import loaderGif from '../../assets/img/new.gif'

// import CardLibraryData from './CardLibraryData'
import thumbnail from '../../assets/img/thumbnail.png'

class CardLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CardLibraryTotalData: [],
      BackendUserData: [],
      CardTitle: "",
      itemperpager: 5,
      loaderFlag: true,

    }
  }

  componentDidMount = () => {
    let { BackendUserData, CardLibraryTotalData, CardTitle, loaderFlag } = this.state;
    let url = Config.host + Config.Cards.Cards_CRUD_Url + "/" + this.props.match.params.id;
    ApiService.apiCall('get', url, {}, (res) => {
      try {
        if (res.data.status == 200) {
          BackendUserData = res.data.data
          localStorage.setItem("cardCollectionExerciseUrlID", this.props.match.params.id)
          CardLibraryTotalData = BackendUserData.exercisesData;
          if (BackendUserData) {
            CardTitle = BackendUserData.title;
            // challengeImageLink = "https://dashchallengesapi.com/static/media/" + users.challengeImage;
          }
          loaderFlag = false
          this.setState({ BackendUserData, CardLibraryTotalData, CardTitle, loaderFlag })
        } else {
          console.log("api call failed.")
        }
      } catch (error) {
        console.log("error :", error);
      }
    })

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

  onChangePerPager = (e) => {
    this.setState({ itemperpager: e.target.value });
  }

  onSearch = (e) => {
    let { CardLibraryTotalData, BackendUserData } = this.state;
    CardLibraryTotalData = BackendUserData.exercisesData.filter(user => user.exerciseName.toString().indexOf(e.target.value) !== -1)
    console.log(CardLibraryTotalData)
    this.setState({ CardLibraryTotalData })
  }

  goCreatePage = () => {
    localStorage.setItem("CardExerciseUUID", "")
    this.props.history.push(`/CardLibrary/CreateNew/${this.state.CardTitle}`)
  }

  onGoEditCardExercise = (editItem) => {
    localStorage.setItem("CardExerciseUUID", editItem.id)
    this.props.history.push(`/CardLibrary/CreateNew/${this.state.CardTitle}`)
  }

  onRemoveCardCollection = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to update this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let url = Config.host + Config.Cards.Cards_CRUD_Url;
            let data = {
              editID: this.props.match.params.id,
              status: "remove"
            }
            ApiService.apiCall('patch', url, data, (res) => {
              try {
                if (res.data.status == 200) {
                  alert("this data is updated !")
                  this.props.history.push(`/CardLibrarys`)
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

  render() {
    return (
      <div className="animated fadeIn">
        {(this.state.loaderFlag != false) &&
          <>
            <div style={{ width: '100%', height: ' 100%', background: 'white', zIndex: '999', position: 'absolute', opacity: '0.5' }}
            >
            </div>
            <img src={loaderGif} style={{ position: 'absolute', top: '40%', left: '40%', zIndex: '1000' }} width="15%" />
          </>
        }
        <Link to="/CardLibrarys" >
          <span>Card Collections</span> &nbsp;
        </Link>/ &nbsp; {this.state.CardTitle}
        <br />
        <br />
        <div style={{ float: 'right' }}>
          <div style={{ display: 'inline-block' }}><CButton color="danger" style={{ float: 'right' }} onClick={this.onRemoveCardCollection}  >Remove </CButton></div>
          <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="basic" style={{ float: 'right' }}   >Bulk Upload </CButton></div>
          <div style={{ display: 'inline-block', marginLeft: '20px' }}><CButton color="info" style={{ float: 'right' }} onClick={this.goCreatePage}  >Create New </CButton></div>
        </div><br />
        <h2> {this.state.CardTitle} </h2>
        <br /><br />

        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader style={{ backgroundColor: "#f2f2f2" }}>
                <h5>Exercise</h5>
              </CCardHeader>
              <CCardBody>
                <div >
                  <div style={{ display: 'inline-block' }}>Show</div>
                  <div style={{ display: 'inline-block' }}>
                    <CSelect custom name="select" id="select" onChange={this.onChangePerPager} >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </CSelect>
                  </div>
                  <div style={{ display: 'inline-block' }}>entires</div>
                  <div style={{ display: 'inline-block', float: 'right', textAlign: 'center' }}>

                    <CForm action="" method="get" inline>
                      <CFormGroup className="pr-1">
                        <CLabel htmlFor="exampleInputName2" className="pr-1">Search</CLabel>
                        <CInput id="exampleInputName2" placeholder="type string..." required onChange={this.onSearch} />
                      </CFormGroup>
                    </CForm>

                  </div>
                </div><br />

                <CDataTable
                  items={this.state.CardLibraryTotalData}
                  fields={['video',
                    { key: 'Name', _classes: 'font-weight-bold' },
                    'CardType', 'EasyVariation', 'HardVariation', 'Audio']}
                  hover
                  // tableFilter = {{label:'Show' , placeholder:'type string...'}}
                  // itemsPerPageSelect = {{label:'Search'}}
                  striped
                  pagination={{ doubleArrows: false, arrows: true, previousButton: 'Previous', nextButton: 'Next', align: 'end' }}
                  itemsPerPage={this.state.itemperpager}
                  // clickableRows
                  // onRowClick={(item, index) => this.props.history.push(`/CardLibrary/CreateNew/${this.state.CardTitle}`)}
                  scopedSlots={{
                    'video':
                      (item) => (
                        <td><img src={Config.host + "/static/media/" + item.BaseThumbnail_fileName} width="50px" height="50px" style={{ cursor: 'pointer' }} onClick={this.onGoEditCardExercise.bind(this, item)} /></td>
                      ),
                    'Name':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {item.exerciseName}</td>
                      ),
                    'CardType':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {item.exerciseTag}</td>
                      ),
                    'EasyVariation':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td>
                          {(item.EasierExerciseName != "N/A") && <span>{item.EasierExerciseName}</span>}
                          {(item.EasierExerciseName == "N/A") && <span>{item.EasierExerciseName}</span>}
                        </td>
                      ),
                    'HardVariation':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td>
                          {(item.HardExerciseName != "N/A") && <span>{item.HardExerciseName}</span>}
                          {(item.HardExerciseName == "N/A") && <span>{item.HardExerciseName}</span>}
                        </td>
                      ),
                    'Audio':
                      (item) => (
                        // <td>{if(item.featured == "true"){return(<div><img src={featuredImage} width="30px" height="30px" /></div>)}}</td>
                        <td> {item.audioTag}</td>
                      ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}

// export default CardLibrary;
export default withRouter(CardLibrary);
