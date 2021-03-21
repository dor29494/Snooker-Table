import React, { useState, useContext, useEffect } from "react";
import { SnookerContext } from "../stateManager/stateManager";
import styled, { keyframes } from "styled-components";
import { rotateInDownLeft, __esModule } from "react-animations";
import firebase from "firebase/app";
import "firebase/auth";
import { rotate, foulsList } from "../services/exportsFile";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  TextField,
  Grid,
  InputAdornment,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  CircularProgress,
} from "@material-ui/core";
import { useRecoilState } from "recoil";
import { accountState, playersLogin,loginRemover,appLoading } from "../stateManager/atoms";
import { useHistory } from "react-router-dom";
const rotateAnimation = keyframes(rotateInDownLeft);

export default function Login({ classes }) {
  const [account, setAccount] = useRecoilState(accountState);
  const [localStorgaeRemove, setLSR] = useRecoilState(loginRemover);
  const [login, setLogin] = useRecoilState(playersLogin);
  const [loading, setLoading] = useRecoilState(appLoading);
  const [errorMsg, setErrorMsg] = useState("");
  let history = useHistory();
  
 

  const sumbitHandler = () => {
    const { email, password, username } = account;
    if(username.length >= 3){
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        let localStorageUser = JSON.stringify({ email, password,username });
        localStorage.setItem("SnookerPass", localStorageUser);
        setLogin(true);
        setLoading(false)
        history.push("/");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (
          errorMessage ===
          "The email address is already in use by another account."
        ) {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              let user = userCredential.user;
              let localStorageUser = JSON.stringify({ email, password,username });
              localStorage.setItem("SnookerPass", localStorageUser);
              setLogin(true);
              setLoading(false)
              history.push("/");
              // ...
            })
            .catch((error) => {
              var signInErrorCode = error.code;
              var signInerrorMessage = error.message;
            });
        }
        console.log("EZA ZAIN", errorMessage, errorCode);
        // ..
      });
    }
    else{
      setErrorMsg('Please inseart a username')
    }
    // [END auth_signup_password]
  };

  const facebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = "he";
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        setLogin(true);
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMsg(errorMessage);
        var email = error.email;
        var credential = error.credential;
      });
  };

  const handleChange = (e) => {
    const { ...data } = account;
    data[e.target.name] = e.target.value;
    setAccount(data);
    if(e.key === 'Enter'){
      sumbitHandler()
    }
  };
  return (
    <>
      {!loading ? (
        <Wrraper>
          <Loading>
            <CircularProgress/>
          </Loading>
        </Wrraper>
      ) : (
        <Dialog
          open={!login}
          onClose={() => login}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Welcome to Snooker-Table!
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.paragraph}>
              {errorMsg}
            </DialogContentText>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="username"
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                className={classes.btn}
                style={{
                  background:
                    "linear-gradient(180deg, #7CFC00 30%, #228B22 90%)",
                }}
                type="submit"
                color="primary"
                onClick={sumbitHandler}
              >
                Signup
              </Button>
              <Button
                className={classes.btn}
                style={{
                  background:
                    "linear-gradient(180deg, #7CFC00 30%, #228B22 90%)",
                }}
                type="submit"
                color="primary"
                onClick={facebookLogin}
              >
                Facebook
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
const Rotate = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const Loading = styled.div`
  colors: #00fe2d, #01d727, #027003, #059b00, #056418;
  display: flex;
`;
const Dot = styled.div`
  position: relative;
  left: 0;
  right: 0;
  font-size: 8vw;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  border-radius: 50%;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: ${rotateAnimation};
  }
`;
const Wrraper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
