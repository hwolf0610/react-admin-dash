import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavbarText,
  CToggler,
  CNavLink,
  CDropdown,
  CForm,
  CInput,
  CButton,
  CImg
} from '@coreui/react'
import {
  CIcon
} from '@coreui/icons-react'

class CNavbars extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navbarText: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }


  render() {
    return (
      <div className="animated fadeIn">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center"/>
            <strong> Bootstrap Navbar </strong>
          </CCardHeader>
          <CCardBody>
            <CNavbar expandable={false} color="info">
              <CToggler inNavbar onClick={this.toggle}/>
              <CNavbarBrand href="#">NavBar</CNavbarBrand>
              <CCollapse show={this.state.isOpen} navbar>
                <CNavbarNav>
                  <CNavLink>Link</CNavLink>
                  <CNavLink disabled>Disabled</CNavLink>
                </CNavbarNav>

                {/* Right aligned nav items */}
                <CNavbarNav className="ml-auto">
                  <CDropdown inNav>
                    <CDropdownToggle>Lang</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>EN</CDropdownItem>
                      <CDropdownItem>ES</CDropdownItem>
                      <CDropdownItem>RU</CDropdownItem>
                      <CDropdownItem>FA</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>

                  <CDropdown inNav>
                    <CDropdownToggle>User</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>Profile</CDropdownItem>
                      <CDropdownItem>Signout</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CNavbarNav>
              </CCollapse>
            </CNavbar>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            CNavbar brand
          </CCardHeader>
          <CCardBody>
            <CNavbar color="faded" light>
              <CNavbarBrand href="#">
                <CImg
                  src="https://placekitten.com/g/30/30"
                  className="d-inline-block align-top"
                  alt="CoreuiVue"
                />
                CoreUI React
              </CNavbarBrand>
            </CNavbar>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            CNavbar text
          </CCardHeader>
          <CCardBody>
            <CNavbar toggleable="sm" light color="light">
              <CToggler
                inNavbar
                onClick={()=>{this.setState({navbarText: !this.state.navbarText})}}
              />
              <CNavbarBrand href="#">NavbarBrand</CNavbarBrand>
              <CCollapse show={this.state.navbarText}>
                <CNavbarNav>
                  <CNavbarText>Navbar text</CNavbarText>
                </CNavbarNav>
              </CCollapse>
            </CNavbar>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            CNavbar form
          </CCardHeader>
          <CCardBody>
            <CNavbar light color="light">
              <CForm inline>
                <CInput
                  className="mr-sm-2"
                  placeholder="Search"
                  size="sm"
                />
                <CButton color="outline-success" className="my-2 my-sm-0" type="submit">Search</CButton>
              </CForm>
            </CNavbar>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            CNavbar input group
          </CCardHeader>
          <CCardBody>
            <CNavbar light color="light">
              <CForm inline>
                <CInput
                  className="mr-sm-2"
                  placeholder="Username"
                />
              </CForm>
            </CNavbar>
          </CCardBody>
        </CCard>
      </div>
    )
  }
}

export default CNavbars
