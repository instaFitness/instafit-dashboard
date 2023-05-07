import { useContext, useState } from "react"
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
  Collapse,
} from "@mui/material"
import {
  Dashboard,
  People,
  ChevronRight,
  ChevronLeft,
  CoPresent,
  SportsKabaddi,
  Restaurant,
  FitnessCenter,
  ExpandLess,
  ExpandMore,
  Task,
  TextSnippet,
  DirectionsRun,
  PlaylistAddCheck,
  Logout,
  PsychologyAlt,
  LibraryAddCheck,
  Money,
} from "@mui/icons-material"
import { Routes, Route, NavLink, useLocation } from "react-router-dom"
import DashboardComponent from "./dashboard/Dashboard"
import UsersComponent from "./users/Users"
import TrainingsComponent from "./trainings/Trainings"
import SocialComponent from "./social/Social"
import MealsComponent from "./meals/Meals"
import FitnessComponent from "./fitness/Fitness"
import RequestComponent from "./request/Request"
import ResponseListComponent from "./response/ResponseList"
import SubscriptionComponent from "./subscription/Subscription"
import AuthContext from "../utils/AuthContext"

export default function Admin() {
  const { logout, user } = useContext(AuthContext)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [openMeal, setOpenMeal] = useState(true)
  const [openTrainings, setOpenTrainings] = useState(true)

  const location = useLocation()

  const handleClick = () => {
    setOpenMeal(!openMeal)
  }

  const handleClickTrainings = () => {
    setOpenTrainings(!openTrainings)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='fixed'>
        <Toolbar sx={{ backgroundColor: "#FAA0A0" }}>
          <Box
            sx={{
              display: "flex",
              paddingLeft: drawerOpen ? "220px" : "60px",
              transition: drawerOpen
                ? "width 225ms cubic-bezier(0, 0, 0.2, 1)"
                : "width 225ms cubic-bezier(0, 0, 0.2, 1)",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <IconButton sx={{ color: "white" }} onClick={() => toggleDrawer()}>
              {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 64,
          transition: drawerOpen
            ? "width 225ms cubic-bezier(0, 0, 0.2, 1)"
            : "width 225ms cubic-bezier(0, 0, 0.2, 1)",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            overflowX: "hidden",
            width: drawerOpen ? 240 : 64,
            transition: drawerOpen
              ? "width 225ms cubic-bezier(0, 0, 0.2, 1)"
              : "width 225ms cubic-bezier(0, 0, 0.2, 1)",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingY: 3,
              }}
            >
              <Box sx={{ paddingBottom: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                  {drawerOpen ? (
                    <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                      <span style={{ color: "#FF3131" }}>I</span>nsta
                      <span style={{ color: "#FF3131" }}>F</span>it
                    </Typography>
                  ) : (
                    <Typography
                      variant='h6'
                      sx={{ color: "#FF3131", fontWeight: "bold" }}
                    >
                      IF
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: drawerOpen ? 80 : 40,
                  height: drawerOpen ? 80 : 40,
                }}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIld2NJZ2VRuOpSWBylHtmbkV3HZmjfXiJQ&usqp=CAU'
              />
              {drawerOpen ? (
                <Typography sx={{ paddingTop: 2 }}>
                  Hello,{" "}
                  <span style={{ color: "#FF3131", fontWeight: "bold" }}>
                    {user.displayName === null ? "Admin" : user.displayName}
                  </span>
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Divider />
            <List>
              {/* <ListItem
            button
            component={NavLink}
            to='/'
            sx={{ textDecoration: "none" }}
          >
            <ListItemAvatar sx={{ mr: 2, color: "#FAA0A0" }}>
              <Dashboard />
            </ListItemAvatar>
            <ListItemText primary='Dashboard' sx={{ fontWeight: "bold" }} />
          </ListItem> */}
              <ListItem
                button
                component={NavLink}
                isActive={location.pathname === "/requests"}
                to='/requests'
                sx={{
                  "&.active": { backgroundColor: "#FAA0A0", color: "white" },
                  textDecoration: "none",
                }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <PsychologyAlt />
                </ListItemAvatar>
                <ListItemText
                  primary='Plan Requests'
                  sx={{ fontWeight: "bold" }}
                />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                isActive={location.pathname === "/responses"}
                to='/responses'
                sx={{
                  "&.active": { backgroundColor: "#FAA0A0", color: "white" },
                  textDecoration: "none",
                }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <LibraryAddCheck />
                </ListItemAvatar>
                <ListItemText
                  primary='Plan Response'
                  sx={{ fontWeight: "bold" }}
                />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                isActive={location.pathname === "/subscriptions"}
                to='/subscriptions'
                sx={{
                  "&.active": { backgroundColor: "#FAA0A0", color: "white" },
                  textDecoration: "none",
                }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <Money />
                </ListItemAvatar>
                <ListItemText
                  primary='Subscriptions'
                  sx={{ fontWeight: "bold" }}
                />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                isActive={location.pathname === "/users"}
                to='/users'
                sx={{
                  "&.active": { backgroundColor: "#FAA0A0", color: "white" },
                  textDecoration: "none",
                }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <People />
                </ListItemAvatar>
                <ListItemText primary='Users' sx={{ fontWeight: "bold" }} />
              </ListItem>
              <ListItemButton
                onClick={() => handleClickTrainings()}
                sx={{ textDecoration: "none" }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <CoPresent />
                </ListItemAvatar>
                <ListItemText primary='trainings' sx={{ fontWeight: "bold" }} />
                {openTrainings ? (
                  <ExpandLess sx={{ color: "#FAA0A0" }} />
                ) : (
                  <ExpandMore sx={{ color: "#FAA0A0" }} />
                )}
              </ListItemButton>
              <Collapse in={openTrainings} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItemButton
                    button
                    component={NavLink}
                    isActive={location.pathname === "/trainings/plan"}
                    to='/trainings/plan'
                    sx={{
                      "&.active": {
                        backgroundColor: "#FAA0A0",
                        color: "white",
                      },
                      pl: 4,
                    }}
                  >
                    <ListItemAvatar>
                      <PlaylistAddCheck />
                    </ListItemAvatar>
                    <ListItemText primary='Training Plan' />
                  </ListItemButton>
                  <ListItemButton
                    button
                    component={NavLink}
                    isActive={location.pathname === "/trainings/target-body"}
                    to='/trainings/target-body'
                    sx={{
                      "&.active": {
                        backgroundColor: "#FAA0A0",
                        color: "white",
                      },
                      pl: 4,
                    }}
                  >
                    <ListItemAvatar>
                      <DirectionsRun />
                    </ListItemAvatar>
                    <ListItemText primary='Target Body' />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem
                button
                component={NavLink}
                isActive={location.pathname === "/socials"}
                to='/socials'
                sx={{
                  "&.active": { backgroundColor: "#FAA0A0", color: "white" },
                  textDecoration: "none",
                }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <SportsKabaddi />
                </ListItemAvatar>
                <ListItemText primary='Socials' sx={{ fontWeight: "bold" }} />
              </ListItem>
              <ListItemButton
                onClick={() => handleClick()}
                sx={{ textDecoration: "none" }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <Restaurant />
                </ListItemAvatar>
                <ListItemText primary='Meals' sx={{ fontWeight: "bold" }} />
                {openMeal ? (
                  <ExpandLess sx={{ color: "#FAA0A0" }} />
                ) : (
                  <ExpandMore sx={{ color: "#FAA0A0" }} />
                )}
              </ListItemButton>
              <Collapse in={openMeal} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItemButton
                    button
                    component={NavLink}
                    isActive={location.pathname === "/meals/plan"}
                    to='/meals/plan'
                    sx={{
                      "&.active": {
                        backgroundColor: "#FAA0A0",
                        color: "white",
                      },
                      pl: 4,
                    }}
                  >
                    <ListItemAvatar>
                      <Task />
                    </ListItemAvatar>
                    <ListItemText primary='Meal Plan' />
                  </ListItemButton>
                  <ListItemButton
                    button
                    component={NavLink}
                    isActive={location.pathname === "/meals/type"}
                    to='/meals/type'
                    sx={{
                      "&.active": {
                        backgroundColor: "#FAA0A0",
                        color: "white",
                      },
                      pl: 4,
                    }}
                  >
                    <ListItemAvatar>
                      <TextSnippet />
                    </ListItemAvatar>
                    <ListItemText primary='Meal Types' />
                  </ListItemButton>
                </List>
              </Collapse>
              {/* <ListItemButton
                onClick={() => handleClickFitness()}
                sx={{ textDecoration: "none" }}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <FitnessCenter />
                </ListItemAvatar>
                <ListItemText primary='Fitness' sx={{ fontWeight: "bold" }} />
                {openFitness ? (
                  <ExpandLess sx={{ color: "#FAA0A0" }} />
                ) : (
                  <ExpandMore sx={{ color: "#FAA0A0" }} />
                )}
              </ListItemButton> */}
              {/* <Collapse in={openFitness} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItemButton
                    button
                    component={NavLink}
                    isActive={location.pathname === '/fitness/plan'}
                    to='/fitness/plan'
                    sx={{ "&.active": { backgroundColor: "#FAA0A0", color: "white" }, pl: 4 }}
                  >
                    <ListItemAvatar>
                      <PlaylistAddCheck />
                    </ListItemAvatar>
                    <ListItemText primary='Fitness Plan' />
                  </ListItemButton>
                  <ListItemButton
                    button
                    component={NavLink}
                    isActive={location.pathname === '/fitness/target-body'}
                    to='/fitness/target-body'
                    sx={{ "&.active": { backgroundColor: "#FAA0A0", color: "white" }, pl: 4 }}
                  >
                    <ListItemAvatar>
                      <DirectionsRun />
                    </ListItemAvatar>
                    <ListItemText primary='Target Body' />
                  </ListItemButton>
                </List>
              </Collapse> */}
            </List>
          </Box>
          <Box sx={{ marginTop: "auto" }}>
            {/* <Avatar
              sx={{
                width: drawerOpen ? 80 : 40,
                height: drawerOpen ? 80 : 40,
              }}
              src={Logo}
            /> */}
            <Divider />
            <ListItemButton
              onClick={handleLogout}
              sx={{ textDecoration: "none" }}
            >
              <ListItemAvatar sx={{ mr: 2, color: "#FAA0A0" }}>
                <Logout />
              </ListItemAvatar>
              <ListItemText primary='Logout' sx={{ fontWeight: "bold" }} />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<DashboardComponent />} />
          <Route path='/requests' element={<RequestComponent />} />
          <Route path='/responses' element={<ResponseListComponent />} />
          <Route path='/users' element={<UsersComponent />} />
          <Route path='/subscriptions' element={<SubscriptionComponent />} />
          <Route path='/trainings/*' element={<TrainingsComponent />} />
          <Route path='/socials' element={<SocialComponent />} />
          <Route path='/meals/*' element={<MealsComponent />} />
          <Route path='/fitness/*' element={<FitnessComponent />} />
        </Routes>
      </Box>
    </Box>
  )
}
