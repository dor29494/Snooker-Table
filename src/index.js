import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import {StateManager} from "./stateManager/stateManager";
import './index.css';
import App from './App';
import {theme} from "./services/exportsFile"
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@material-ui/core/styles/'
import firebase from "firebase/app";
import {
  RecoilRoot,
} from 'recoil';
import "firebase/storage";

function initialize() {
  // [START storage_initialize]
  // Set the configuration for your app
  // TODO: Replace with your app's config object
  var firebaseConfig = {
    apiKey: "AIzaSyBwQchV2xy7faO8GAbwsUVt7xlTHYQxPtM",
    authDomain: "snooker-scoreboard-a3bc3.firebaseapp.com",
    projectId: "snooker-scoreboard-a3bc3",
    storageBucket: "snooker-scoreboard-a3bc3.appspot.com",
    messagingSenderId: "351656188668",
    appId: "1:351656188668:web:a5533c70b3ebac3f8b1579",
    measurementId: "G-0E6QMGZ7VG"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  // [END storage_initialize]
}
initialize()
const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <Router>
      <RecoilRoot>
        <ThemeProvider
        theme={theme}>
    <App />
        </ThemeProvider>
        </RecoilRoot>
    </Router>
  </>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
