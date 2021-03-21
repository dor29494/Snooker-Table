import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Box, createMuiTheme } from "@material-ui/core";
import { orange, blueGrey, green, red } from "@material-ui/core/colors";
import styled, { keyframes } from "styled-components";
export const rotate = keyframes`
50%,
75% {
  transform: scale(2.5);
}

80%,
100% {
  opacity: 0;
}
`;

export const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    background: 'lightgrey',
    width: "100%",
    height: "100vh",
    position: "relative",
    fontFamily: "RocknRoll One, sans-serif",
  },
  topBar:{
    zIndex: '10',
  },
  showWrapper:{ 
  border: "5px solid #8B4513",
  justifyContent: "space-between",
  maxWidth: "50%",
  minHeight: "70%",
  position: "relative",
  top: "2vw",
  boxShadow: "0px 5px 15px 5px #000000",
  borderRadius: "2vw",},
  appWrapper: {
    display: 'flex',
    background: "#0a6c03",
    border: "5px solid #8B4513",
    justifyContent: "center",
    maxWidth: "50%",
    minHeight: "70%",
    position: "relative",
    top: "2vw",
    boxShadow: "0px 5px 15px 5px #000000",
    borderRadius: "2vw",
  },
  ballsGrid: {
    flexDirection: "column",
    maxWidth: '100%',
  },
  ballWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    boxShadow: '1px 8px 15px -4px #000000',
    border: '3px solid saddlebrown',
    padding: '1.5vw',
    borderRadius: '1vw',
    marginBottom: '1vw',
   },
   LoginTitle:{
     fontSize: '25vw',
   },
  homeWrapper: {
    display: 'flex',
    padding: "0",
    margin: "0",
  },
  playersBar: {
    marginLeft: "0",
    marginTop: "0.5vw",
    border: "2px solid black",
    minWidth: "100%",
  },
  ballList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  scoreHolder: {
    flexGrow: "1",
    color: "white",
    border: "2px solid black",
    marginTop: "1vw",
  },
  scoreDisplay: {
    display: 'flex',
    marginBottom: '5vw',
  },
  showScoreBoard: { 
    minHeight: '80vh'
  },
  loginWrapper:{
    fontSize: 'RocknRoll One',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    right: '0',
    left: '0',
    background: 'darkgrey',
    zIndex: '1',
    margin: '0',
    minWidth: '100%',
    minHeight: '100%',
  },
  paragraph: {
    color: 'red',
    fontFamily: 'Yanone Kaffeesatz',

  },
  loginFloater:{
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '10vw',
    background: 'deeppink',
    height: '30vw',
    width: '30vw'
  },
  loginInputs:{
    marginBottom: '1vw'
  },
  btn: {
    background: "linear-gradient(45deg, #8B4513 30%, #D2691E 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: "4vw",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    fontFamily: "RocknRoll One",
    margin: '1vw',
  },
  buttonBlue: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  },
  paper: {
    alignSelf: "center",
  },
  active: {
    border: "2px solid white",
  },
  fab: {
    margin: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  bottomMenu: {
    width: 500,
    margin: "auto",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(6),
  },
}));

export const theme = createMuiTheme({
  direction: "rtl",
  palette: {
  
  },
  typography: {
    h3: {
      fontSize: 36,
      marginBottom: 15,
    },
    h4: { fontSize: 26,marginBottom: "10vw" ,color: "black",fontFamily:'RocknRoll One' },
    h6: { fontSize: 26, marginRight: "20px", color: "black",fontFamily:'RocknRoll One' },
  },
});

export const ballAddObj = {
  red: 1,
  yellow: 2,
  green: 3,
  brown: 4,
  blue: 5,
  pink: 6,
  black: 7,
};
export const ballColors = [
  "red",
  "yellow",
  "green",
  "brown",
  "blue",
  "pink",
  "black",
];
export const foulsObject = {
  foul: 4,
  yellow: 2,
  green: 3,
  brown: 4,
  blue: 5,
  pink: 6,
  black: 7,
};
export const foulsList = [4, 5, 6, 7];
