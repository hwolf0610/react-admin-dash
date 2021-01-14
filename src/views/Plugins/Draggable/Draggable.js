import React, { Component } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CBadge } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './Draggable.css'
import defaultLayouts from './_layouts';

const breakPoints = {}
breakPoints.xl = parseInt(getStyle('--breakpoint-xl'), 10)
breakPoints.lg = parseInt(getStyle('--breakpoint-lg'), 10)
breakPoints.md = parseInt(getStyle('--breakpoint-md'), 10)
breakPoints.sm = parseInt(getStyle('--breakpoint-sm'), 10)
breakPoints.xs = parseInt(getStyle('--breakpoint-xs'), 10)

const ResponsiveGridLayout = WidthProvider(Responsive);

class Draggable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(localStorage.getItem('CoreUI-React-Draggable-Layouts') || JSON.stringify(defaultLayouts))
    };
  }

  resetLayout() {
    this.setState({ layouts: JSON.parse(JSON.stringify(defaultLayouts)) });
  }

  onLayoutChange(layout, layouts) {
    localStorage.setItem('CoreUI-React-Draggable-Layouts', JSON.stringify(layouts))
    this.setState({ layouts });
  }

  render() {

    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'

    return (
      <div className="animated c-fadeIn">
        <ResponsiveGridLayout className="layout" layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          breakpoints={breakPoints}
          cols={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          isResizable={false}
          measureBeforeMount={false}
          draggableHandle={".card-header"}>
            
          <CCard key="a" accentColor="secondary" >
            <CCardHeader>
              <CIcon name="cil-cursor-move"></CIcon>
              Drag & Drop Card <CBadge href="https://coreui.io/pro/react/" color="danger">CoreUIsss Pro Component</CBadge>
            </CCardHeader>
          </CCard>

          <CCard key="c" accentColor="secondary" >
            <CCardHeader>
              <CIcon name="cil-cursor-move"></CIcon>
              Drag & Drop Card <CBadge href="https://coreui.io/pro/react/" color="danger">CoreUIsss Pro Component</CBadge>
            </CCardHeader>
          </CCard>
 

        </ResponsiveGridLayout>
      </div>
    )
  }
}

export default Draggable
