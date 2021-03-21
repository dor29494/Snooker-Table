import React, { useContext, useEffect } from "react";
import Home from "./Home/Home";
import TopBar from "./TopBar/TopBar";
import Login from "./Login/Login";
import { useStyles} from "./services/exportsFile";
import { playersLogin } from "./stateManager/atoms";
import styled from "styled-components";
import io from "socket.io-client";
import "./App.css";
import { Container} from "@material-ui/core";
import { useRecoilState} from "recoil";
import { Route,useHistory} from "react-router-dom";
import Show from "./Show/Show";
import firebase from "firebase/app";
import "firebase/auth";
import {
  accountState,
  displayState,
  appLoading,
  socketAlertState,
  alertState,
} from "./stateManager/atoms";

function App() {
  const socket = io("https://reveal-multiplex.glitch.me/");
  const [display, setDisplay] = useRecoilState(displayState);
  const [account, setAccount] = useRecoilState(accountState);
  const [login, setLogin] = useRecoilState(playersLogin);
  const [loading, setLoading] = useRecoilState(appLoading);
  const [socketAlerts, setSocketAlerts] = useRecoilState(socketAlertState);
  const [alertObj, setAlert] = useRecoilState(alertState);


  let classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    let localStorageObject = JSON.parse(localStorage.getItem("SnookerPass"));
    console.log(">>>>", localStorageObject);
    if (localStorageObject) {
      const { password, email, username } = localStorageObject;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          setLogin(true);
          setLoading(false);
          setAccount(localStorageObject);
          setAlert({
            alert: false,
            alertMsg: '',
          })
          setSocketAlerts({
            alert: false,
            alertMsg: '',
          })
          history.push("/");
          setLoading(false)
        })
        .catch((error) => {
          localStorage.removeItem("SnookerPass");
          console.log(error)
          var signInErrorCode = error.code;
          var signInerrorMessage = error.message;
          history.push("/signin");
        });
    } 
  }, []);
  useEffect(() => {
    socket.on("3fbc77dac0c245be", function (data) {
      // console.log(data);
      // ignore data from sockets that aren't ours
      if (data.socketId !== "3fbc77dac0c245be") {
        return console.log("WRONG");
      }
      // console.log('step 3 , listeing alert...', data.state.alert)
      //const {incomingData} = data;
      // incomingData.state.score = score
      // console.log(data.state.alert);
      setSocketAlerts(data.state.alert);
      setDisplay(data.state.score);
    });

    socket.on("connect", (data) => {
      if (data) {
        console.log("On is ON!");
        console.log(data);
      }
    });
    console.log("finish");
  }, []);

  return (
    <div className={classes.root}>
      <TopBar classes={classes} />
      <Route path="/show">
        <Show classes={classes} />
      </Route>
      <Route path="/signin">
        <Login classes={classes} />
      </Route>
      <Route exact path="/">
        <Container fixed justify="center" className={classes.appWrapper}>
          <Home classes={classes} socket={socket} />
        </Container>
      </Route>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vw;
  background: lightgrey;
  height: 30vw;
  width: 30vw;
`;
const BodyWrapper = styled.div`
  font-size: "RocknRoll One", sans-serif;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  left: 0;
  background: red;
  height: 100vw;
  width: 100vw;
`;
