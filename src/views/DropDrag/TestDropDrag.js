import React, { Component } from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CDataTable, CInput, CTextarea, CFormText, CToaster, CToastHeader, CToastBody, CToast, CListGroup, CListGroupItem } from '@coreui/react';
import { render } from "react-dom";
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath, getNodeAtPath, toggleExpandedForAll, defaultSearchMethod, map as mapTree } from 'react-sortable-tree';
// import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import FileExplorerTheme2 from 'react-sortable-tree-theme-minimal';
import FileExplorerTheme3 from 'react-sortable-tree-theme-full-node-drag';

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

import "./style.scss";

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) =>
  <CListGroup style={{ marginTop: '10px' }}>
    <CListGroupItem href="#" style={{ backgroundColor: "#F0F3F5" }} ><h5>Day {value + 1}</h5></CListGroupItem>
    <ul> <li>{value}</li> <li>{value}</li></ul>
    <CListGroupItem href="#" style={{ height: "50px" }} onClick={() => this.props.history.push('/Version/NewTask')} >
      +Create Task
</CListGroupItem>
  </CListGroup>
  //  <ul> <li>{value}</li>
  //   <li>{value}</li></ul>
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      )
        // <SortableItem key={`item-${index}`} index={index} value={value} />
      )}
    </ul>
  );
});

class TestDropDrag extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      treeData1: [
        { title: "Day1", url: "/Version/NewTask", expanded: true, children: [{ title: "Strength Task1" }] },
        { title: "Day2", url: "/Version/NewTask", expanded: true, children: [{ title: "Strength Task2" }] },
        { title: "Day3", url: "/Version/NewTask", expanded: true, children: [{ title: "Strength Training1" }] }
      ],
      treeData2: [
        { title: 'Day1', children: [{ title: 'index1.js' }] },
        { title: 'Day2', children: [{ title: 'index2.js' }] },
        { title: 'Day3', children: [{ title: 'index2.js' }] },
        { title: 'Day4', children: [{ title: 'index2.js' }] },
        { title: 'Day5', children: [{ title: 'index2.js' }] },
        { title: 'Day6', children: [{ title: 'index3.js' }] }
      ],
      items: ['Item 1', 'Item 2', 'Item 3'],
      treeData: [
        { id: "DayTask1", title: "Day1", expanded: true, children: [{ title: "Strength Task1" }] },
        { id: "DayTask2", title: "Day2", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask3", title: "Day3", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask4", title: "Day4", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask5", title: "Day5", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask6", title: "Day6", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask7", title: "Day7", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask8", title: "Day8", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask9", title: "Day9", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask10", title: "Day10", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask11", title: "Day11", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask12", title: "Day12", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask13", title: "Day13", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask14", title: "Day14", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask15", title: "Day15", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask16", title: "Day16", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask17", title: "Day17", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask18", title: "Day18", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask19", title: "Day19", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask20", title: "Day20", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask21", title: "Day21", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask22", title: "Day22", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask23", title: "Day23", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask24", title: "Day24", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask25", title: "Day25", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask26", title: "Day26", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask27", title: "Day27", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask28", title: "Day28", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask29", title: "Day29", expanded: true, children: [{ title: "Strength Task2" }] },
        { id: "DayTask30", title: "Day30", expanded: true, children: [{ title: "Strength Training1" }] }
      ],
      innerHeight: 0,
    };
  }

  componentDidMount = () => {
    let { innerHeight } = this.state
    innerHeight = window.innerHeight - 150;
    console.log("window:", window.innerHeight)
    this.setState({ innerHeight })
  }

  onGoCreateTaskPage = () => [
    this.props.history.push('/Version/NewTask')
  ]

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  addNodeTask = (rowInfo) => {
    if (rowInfo.node.title.toString().indexOf("Day") !== -1) {
      localStorage.setItem("editPlanVersionDayTaskID", "")
      this.props.history.push('/Version/NewTask')
    } else {
      localStorage.setItem("editPlanVersionDayTaskID", rowInfo.node.title)
      this.props.history.push('/Version/NewTask')
    }
  }
  addNode = (rowInfo) => {
    if (rowInfo.node.title.toString().indexOf("Day") !== -1) {
      alert("This is Day Task Title.")
    } else {
      console.log("rowInfo:", rowInfo)
      let NEW_NODE = { title: rowInfo.node.title };
      let { node, treeIndex, path } = rowInfo;
      path.pop();
      let parentNode = getNodeAtPath({
        treeData: this.state.treeData,
        path: path,
        getNodeKey: ({ treeIndex }) => treeIndex,
        ignoreCollapsed: true
      });
      let getNodeKey = ({ node: object, treeIndex: number }) => {
        return number;
      };
      let parentKey = getNodeKey(parentNode);
      if (parentKey == -1) {
        parentKey = null;
      }
      let newTree = addNodeUnderParent({
        treeData: this.state.treeData,
        newNode: NEW_NODE,
        expandParent: true,
        parentKey: parentKey,
        getNodeKey: ({ treeIndex }) => treeIndex
      });
      this.setState({ treeData: newTree.treeData });
    }

  }

  removeNode = (rowInfo) => {
    if (rowInfo.node.title.toString().indexOf("Day") !== -1) {
      alert("This is Day Task Title.")
    } else {
      let { node, treeIndex, path } = rowInfo;
      this.setState({
        treeData: removeNodeAtPath({
          treeData: this.state.treeData,
          path: path,   // You can use path from here
          getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            // console.log(number);
            return number;
          },
          ignoreCollapsed: false,
        })
      })
    }
  }

  updateTreeData = (treeData) => {
    this.setState({ treeData });
  }

  renderButton = (title) => {
    return title === 'Day1' ? <button>Your button</button> : null
  }

  render() {
    return (
      <div style={{ height: (this.state.innerHeight) }}>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />

        <SortableTree

          // canDrop={canDrop}
          // getNodeKey={({ node }) => node.id}
          treeData={this.state.treeData}
          onChange={this.updateTreeData}
          theme={FileExplorerTheme2}
          // className="rst__nodeContent"
          generateNodeProps={rowInfo => ({
            buttons: [
              <div >
                {/* <TextField
                  hintText=""
                  multiLine={true}
                  rows={1}
                  rowsMax={4}
                /><br /> */}
                <CButton label='Delete' color="danger" onClick={(event) => this.removeNode(rowInfo)}>Remove</CButton>
                <CButton style={{ marginLeft: "10px" }} label='Add' color="info" onClick={(event) => this.addNode(rowInfo)}>Duplicate</CButton>
                <CButton style={{ marginLeft: "10px" }} label='NewTask' color="success" onClick={(event) => this.addNodeTask(rowInfo)}>Create Task</CButton>
              </div>,
            ],
            style: {
              height: '50px',
            },
          })}
        />
      </div>



    );
  }
}



export default TestDropDrag;


{/* <SortableList items={this.state.items} onSortEnd={this.onSortEnd} /> */ }

{/* <SortableTree
          treeData={this.state.treeData1}
          onChange={treeData1 => {
            this.setState({ treeData1 });
            console.log(treeData1)
          }}
        /> */}

{/* 
        <SortableTree
          treeData={this.state.treeData2}
          onChange={treeData2 => this.setState({ treeData2 })}
          theme={FileExplorerTheme}
        /> */}



{/* <SortableTree
          treeData={this.state.treeData4}
          onChange={treeData4 => this.setState({ treeData4 })}
          theme={FileExplorerTheme3}
            generateNodeProps={({ node, path }) => ({
            title: (
                <a href={node.url}>
                  {node.title}
                  {this.renderButton.bind(this, node.title)}
                </a>
            ),
        })}

        /> */}