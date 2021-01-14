import React, { Component, Suspense, useState, Fragment } from "react";
import { useHistory, withRouter } from "react-router-dom";
// Stylesheet
import "../../css/admin-sidebar.css";

// Navigation
import navigation from "../../navigation";

// Material UI
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  logoutItemAbsolute: {
    position: "absolute",
    bottom: "0px",
  },
  containerRelative: {
    position: "relative",
  },
  containerAbsolute: {
    position: "absolute",
    height: "95vh",
    width: "100%",
  },
  brandHeader: {
    padding: "15px 30px",
    boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.07)",
    marginBottom: "15px",
    cursor: 'default'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#1aa0ff",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(11),
    },
    background: "#1aa0ff",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  activeTabBackground: {
    backgroundColor: "white",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nonActiveBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  onItemOver: {
    color: "white",
  },
  onItemOut: {
    color: "white",
    opacity: ".5",
  },
}));

function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tabs, setTabs] = React.useState(navigation);


  const history = useHistory();

  const onAccountLogout = () => {
    console.log("logout");
    // localStorage.setItem("accountLoginFlag", "no");
    sessionStorage.setItem("user_token", "null");
    // sessionStorage.setItem('user_token', "null");
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
 
  };

  const handleDrawerClose = () => {
    setOpen(false);
 
  };

  const handleActiveTabs = (_tab) => {
    let _activeTab = tabs.find((tab) => tab.isActive === true);

    console.log("Active Tab: ", _activeTab);
    let updatedTabs = tabs.map((tab) => {
      if (tab.id === _tab.id) {
        history.push(`${tab.to}`);
        tab.isActive = true;
      } else if (tab.id === _activeTab.id) {
        tab.isActive = false;
      }
      return tab;
    });
    setTabs(updatedTabs);
    console.log(tabs);
  };

  const handleHoverOn = (id) => {
    const prevHoveredTab = tabs.find((tab) => tab.isHover === true);
  
    const updatedTabs = tabs.map(tab => {
      if(tab.id === id) {
        tab.isHover = true
      } else if(tab.id !== id) {
        tab.isHover = false
      } else if(prevHoveredTab) {
        prevHoveredTab.isHover = false
      }
      return tab
    })

    setTabs(updatedTabs)
    
  }

  const handleHoverOff = (id) => {
    const prevHoveredTab = tabs.find((tab) => tab.isHover === true);
    const updatedTabs = tabs.map(tab => {
      if(tab.id === id) {
        tab.isHover = false
      } else if(tab.id !== prevHoveredTab.id) {
        tab.isHover = false
      }
      return tab
    })

    setTabs(updatedTabs)
    
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.containerRelative}
        onMouseOver={handleDrawerOpen}
        onMouseOut={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List className={classes.containerAbsolute}>
          {tabs.map((item) => {
            if (item.name === "Brand") {
              return (
                <ListItem
                  className={classes.brandHeader}                
                  key={item.id}
                >
                  <ListItemIcon>
                    <img className="brand-icon" src={item.icon} alt="" />
                  </ListItemIcon>
                  <ListItemText primary={item.to} />
                </ListItem>
              );
            }
          })}

          {tabs.map((item, index) => {
            if (item.name !== "Logout" && item.name !== "Brand") {
              const {
                svgContent: {
                  xmlns,
                  height,
                  width,
                  fill,
                  path,
                  path2,
                  viewBox,
                },
              } = item;
              return (
                <ListItem
                  onMouseOver={() => handleHoverOn(item.id)}
                  onMouseOut={() => handleHoverOff(item.id)}
                  onClick={() => handleActiveTabs(item)}
                  key={item.id}
                >
                  <ListItemIcon>
                    {item.iconBackdrop === true ? (
                      <div
                        className={
                          item.isActive
                            ? classes.activeTabBackground
                            : classes.nonActiveBackground
                        }
                      >
                        {item.isActive ? (
                    
                          <svg
                            height={height}
                            width={width}
                            viewBox={viewBox}
                            fill="none"
                            xmlns={xmlns}
                          >
                            <path d={path.d} fill="#1aa0ff" />
                            {path2 !== null ? (
                              <path d={path2.d} fill="#1aa0ff" />
                            ) : (
                              ""
                            )}
                          </svg>
                        ) : (
                          <svg
                            height={height}
                            width={width}
                            viewBox={viewBox}
                            fill="none"
                            xmlns={xmlns}
                          >
                            <path d={path.d} fill="white" />
                            {path2 !== null ? (
                              <path d={path2.d} fill="white" />
                            ) : (
                              ""
                            )}
                          </svg>
                        )}
                      </div>
                    ) : (
                      <div className="icon-backdrop">
                        <img src={item.icon} />
                      </div>
                    )}
                  </ListItemIcon>
                  {item.isActive ? (
                
                    <div className="active-tab">{item.name}</div>
                  ) : (
                    <div className={ item.isHover  ? 'active-tab' : 'non-active-tab'}>{item.name}</div>
                  )}
                </ListItem>
              );
            }
          })}
          {tabs.map((item) => {
            if (item.name === "Logout") {
              return (
                <ListItem
                  onClick={onAccountLogout}
                  className={classes.logoutItemAbsolute}
                  key={item.id}
                >
                  <ListItemIcon>
                    <img className="logout-item" src={item.icon} alt="" />
                  </ListItemIcon>
                  <div className="logout-item">{item.name}</div>
                </ListItem>
              );
            }
          })}
        </List>
      </Drawer>
    </div>
  );
}

// import {
//   CCreateElement,
//   CSidebar,
//   CSidebarBrand,
//   CSidebarNav,
//   CSidebarNavDivider,
//   CSidebarNavTitle,
//   CNavItem,
//   CProgress,
//   CSidebarMinimizer,
// } from "@coreui/react";

// import { CIcon } from "@coreui/icons-react";

// //logo
// import logo from "../../assets/img/brand/app_logo.png";
// import sygnet from "../../assets/img/brand/coreui-signet-white.svg";

// sidebar nav config
// import navigation from "../../_nav";

// class DefaultSidebar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       minimize: props.sidebarMinimize,
//     };
//     this.lastSidebarMinimize = props.sidebarMinimize;
//   }

//   render() {
//     const { sidebarShow, sidebarMinimize, onChange } = this.props;

//     if (sidebarMinimize !== this.lastSidebarMinimize) {
//       this.setState({ minimize: sidebarMinimize });
//       this.lastSidebarMinimize = sidebarMinimize;
//     }

//     return (

//       <CSidebar
//         show={sidebarShow}
//         unfoldable
//         minimize={this.state.minimize}
//         onShowChange={onChange}
//         dropdownMode="closeInactive"
//         style={{backgroundColor:'#33adff'}}
//       >
//         <CSidebarBrand className="d-md-down-none" to="/" style={{backgroundColor:'white'}}>
//           <CIcon
//             className="c-sidebar-brand-full"
//             src={logo}
//             height={35}
//           />
//           {/* Dash Admin Panel */}
//           <CIcon
//             className="c-sidebar-brand-minimized"
//             src={sygnet}
//             height={35}
//           />
//         </CSidebarBrand>
//         <Suspense>
//           <CSidebarNav>

//             <CCreateElement items={navigation}/>

//             <CSidebarNavDivider />
//             <CSidebarNavTitle>System Utilization</CSidebarNavTitle>
//             <CNavItem className="px-3 d-compact-none c-d-minimized-none">
//               <div className="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>
//               <CProgress size="xs" value={25} color="info" />
//               <small className="text-muted">348 Processes. 1/4 Cores.</small>
//             </CNavItem>
//             <CNavItem className="px-3 d-compact-none c-d-minimized-none">
//               <div className="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>
//               <CProgress size="xs" value={70} color="warning" />
//               <small className="text-muted">11444GB/16384MB</small>
//             </CNavItem>
//             <CNavItem className="px-3 mb-3 d-compact-none c-d-minimized-none">
//               <div className="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>
//               <CProgress size="xs" value={95} color="danger" />
//               <small className="text-muted">243GB/256GB</small>
//             </CNavItem>
//           </CSidebarNav>
//         </Suspense>
//         {/* <CSidebarMinimizer className="c-d-md-down-none"/> */}
//       </CSidebar>

export default withRouter(MiniDrawer);
