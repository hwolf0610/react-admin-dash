import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CPagination
} from '@coreui/react'

class Paginations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 2
    }
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <CCard>
          <CCardHeader>
            Pagination
            <div className="card-header-actions">
              <a href="https://coreui.github.io/components/pagination/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CCardHeader>
          <CCardBody>
            <h6>Default</h6>
            <CPagination
              activePage={this.state.currentPage}
              pages={10}
              onActivePageChange={(i) => this.setState({currentPage: i})}
            />
            <br></br>

            <h6>Small</h6>
            <CPagination
              size="sm"
              activePage={this.state.currentPage}
              pages={10}
              onActivePageChange={(i) => this.setState({currentPage: i})}
            />
            <br></br>

            <div className="d-md-down-none">
              <h6>Large</h6>
              <CPagination
                size="lg"
                activePage={this.state.currentPage}
                pages={10}
                onActivePageChange={(i) => this.setState({currentPage: i})}
              />
              <br></br>
            </div>

            <div>currentPage: {this.state.currentPage}</div>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <strong> Pagination </strong>
            <small>alignment</small>
          </CCardHeader>
          <CCardBody>
            <h6>Left alignment (default)</h6>
            <CPagination
              activePage={this.state.currentPage}
              pages={10}
              onActivePageChange={(i) => this.setState({currentPage: i})}
            />
            <br></br>

            <h6>Center alignment</h6>
            <CPagination
              align="center"
              addListClass="some-class"
              activePage={this.state.currentPage}
              pages={10}
              onActivePageChange={(i) => this.setState({currentPage: i})}
            />
            <br></br>

            <h6>Right (end) alignment</h6>
            <CPagination
              align="end"
              activePage={this.state.currentPage}
              pages={10}
              onActivePageChange={(i) => this.setState({currentPage: i})}
            />
            <br></br>

            <div>currentPage: {this.state.currentPage}</div>
          </CCardBody>
        </CCard>
      </div>
    )
  }
}

export default Paginations
