import React, { useEffect, useState } from "react";
import {
  useRecoilState,
} from "recoil";
import {
  Container,
  Box,
  Paper,
  Grid,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { flash, __esModule } from "react-animations";
import MuiAlert from "@material-ui/lab/Alert";
import {
  displayState,
  socketAlertState,
  alertState,
} from "../stateManager/atoms";
import "fontsource-roboto";
import styled, { keyframes } from "styled-components";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const flashAnimation = keyframes`${flash}`;
function Show({ classes }) {
  const [display, setDisplay] = useRecoilState(displayState);
  const [socketAlerts, setSocketAlerts] = useRecoilState(socketAlertState);
  const [alertObj, setAlert] = useRecoilState(alertState);
  const [open, setOpen] = useState(false);
  if (!display) return <Box>No Online Game</Box>;
  // const [display,setDisplay] = useState({
  //   player1: 23,
  //   player2: 24
  // })
  console.log(`step 4 show display socketAlertObj = ${socketAlerts} ${display.player1} and alertObj ${alertObj}`)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    let prevAlertObj = alertObj;
    let prevSocketsAlert = socketAlerts;
    setSocketAlerts({ ...prevAlertObj, alert: false ,alertMsg: "",});
    setAlert({ ...prevSocketsAlert, alert: false, alertMsg: ""  });

    if (reason === "clickaway") {
      return;
    }
  
  };

  return (
    <Container className={classes.showWrapper}>
      <Snackbar
        open={socketAlerts.alert}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{marginTop: '3.2vw'}}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success">
          {socketAlerts.alertMsg}{" "}
        </Alert>
      </Snackbar>
      <Grid container className={classes.showScoreBoard} direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography>
          <Flash>
            {socketAlerts.alertMsg}{" "}
          </Flash>
          </Typography>
        </Grid>
        <Grid item className={classes.scoreDisplay}>
          <Grid item xs={6} spacing={3}>
            <Paper
              elevation={5}
              style={{
                background: "red",
                minHeight: "90%",
                fontSize: "90px",
                textAlign: "center",
                minWidth: "20vw",
                border: '1px solid black',
                marginRight: '2vw',
              }}
            >
              {display.player1}
            </Paper>
          </Grid>
          <Grid item xs={6} spacing={3}>
            <Paper
              elevation={5}
              style={{
                background: "blue",
                minHeight: "90%",
                fontSize: "90px",
                textAlign: "center",
                border: '1px solid black',
                minWidth: "20vw",
              }}
            >
              {display.player2}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Show;

const Flash = styled.h1`
  animation: 4s ${flashAnimation};
  margin: 1vw;
  animation-iteration-count: infinite;
  font-size: 2vw;
  color: black;
`;