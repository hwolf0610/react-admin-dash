import React, { Component } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CForm,
  CInput,
  CInputCheckbox,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormGroup,
  CLabel
} from '@coreui/react'

class Toaster extends Component {

  constructor(props) {
    super(props)

    this.addToast = this.addToast.bind(this)
    this.state = {

      toasts: [
        { position: 'static'},
        { position: 'static'},
        { position: 'top-right', autohide: 3000 }
      ],
      autohide: true,
      autohideValue: 5000,
      closeButton: true,
      fade: true,
      position: 'top-right',
      positions: [
        'static',
        'top-left',
        'top-center',
        'top-right',
        'top-full',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'bottom-full'
      ]
    }
  }

  addToast() {
    this.state.toasts.push(this.toastConfig)
    this.setState({toasts: this.state.toasts})
  }

  render() {

    this.toasters = (()=>{
      return this.state.toasts.reduce((toasters, toast) => {
        toasters[toast.position] = toasters[toast.position] || []
        toasters[toast.position].push(toast)
        return toasters
      }, {})
    })()

    this.toastConfig = (()=>{
      return {
        autohide: this.state.autohide ? this.state.autohideValue : false,
        closeButton: this.state.closeButton,
        fade: this.state.fade,
        position: this.state.position,
      }
    })()


    return (
      <div className="animated">
        <CCard>
          <CCardHeader>
            Toasts.
          </CCardHeader>
          <CCardBody>
            <CContainer>
              <CRow>
                <CCol sm="12" lg="6">
                  <CForm>
                    <h5>Add toast with following props:</h5>

                    <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                      <CInputCheckbox
                        id="autohide"
                        checked={this.state.autohide}
                        onChange={()=>{this.setState({autohide: !this.state.autohide})}}
                        custom
                      />
                      <CLabel variant="custom-checkbox" htmlFor="autohide">
                        Autohide of the toast
                      </CLabel>
                    </CFormGroup>
                    {
                      this.state.autohide ?
                        <CFormGroup className="my-2">
                          <CLabel htmlFor="ccyear">Time to autohide</CLabel>
                          <CInput
                            type="number"
                            value={this.state.autohideValue}
                            onChange={(e)=>{this.setState({
                              autohideValue: Number(e.target.value)
                            })}}
                          />
                        </CFormGroup> : null
                    }

                    <CFormGroup className="my-2">
                      <CLabel htmlFor="ccyear">Position</CLabel>
                      <select
                        className="form-control"
                        value={this.state.position}
                        onChange={(e)=>{this.setState({position: e.target.value})}}
                      >
                        {
                          this.state.positions.map((position, i)=>(
                            <option key={i}>{position}</option>
                          ))
                        }
                      </select>
                    </CFormGroup>

                    <CFormGroup variant="custom-checkbox" className="my-2">
                      <CInputCheckbox
                        id="fade"
                        checked={this.state.fade}
                        onChange={()=>{this.setState({fade: !this.state.fade})}}
                        custom
                      />
                      <CLabel variant="custom-checkbox" htmlFor="fade">fade</CLabel>
                    </CFormGroup>

                    <CFormGroup variant="custom-checkbox" className="my-2">
                      <CInputCheckbox
                        id="close"
                        custom
                        checked={this.state.closeButton}
                        onChange={()=>{this.setState({closeButton: !this.state.closeButton})}}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="close">closeButton</CLabel>
                    </CFormGroup>

                    <CButton
                      className="mr-1 w-25"
                      color="success"
                      onClick={this.addToast}
                    >
                      Add toast
                    </CButton>

                  </CForm>
                </CCol>
                <CCol sm="12" lg="6">
                  {Object.keys(this.toasters).map((toasterKey) => (
                    <CToaster
                      position={toasterKey}
                      key={'toaster' + toasterKey}
                    >
                      {
                      this.toasters[toasterKey].map((toast, key)=>{
                        return(
                          <CToast
                            key={'toast' + key}
                            show={true}
                            autohide={toast.autohide}
                            fade={toast.fade}
                          >
                            <CToastHeader closeButton={toast.closeButton}>
                              Toast title
                            </CToastHeader>
                            <CToastBody>
                              {`This is a toast in ${toasterKey} positioned toaster number ${key + 1}.`}
                            </CToastBody>
                          </CToast>
                        )
                      })
                      }
                    </CToaster>
                  ))}
                </CCol>
              </CRow>
            </CContainer>
          </CCardBody>
        </CCard>
      </div>
    )
  }
}

export default Toaster
