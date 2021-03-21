import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { flash, __esModule } from "react-animations";
import Show from "../Show/Show";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import PopUpMenu from "./PopUpMenu/PopUpMenu";
import "fontsource-roboto";
import PointSwitcher from "./PointSwitcher/PointSwitcher";
import {
  scoreState,
  activeState,
  accountState,
  pointDeciderState,
  actionState,
  playersLogin,
} from "../stateManager/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
const flashAnimation = keyframes`${flash}`;

function Home({ classes, socket }) {
  let history = useHistory()
  const score = useRecoilValue(scoreState);
  const [active, setActive] = useRecoilState(activeState);
  const [action, setAction] = useRecoilState(actionState);
  const [login, setLogin] = useRecoilState(playersLogin);
  const account = useRecoilValue(accountState);
  const pointDecider = useRecoilValue(pointDeciderState);
  const activeObj = {
    add: "add",
    foul: "foul",
  };
  const [homeMessage, setHomeMessage] = useState({
    noPlayer: "Please Choose a Player",
    player1Add: `Press to add ${account.username} point!`,
    player1Punish: `Press to pendelty ${account.username}`,
    player2Add: `Press to add Opponent point!`,
    player2Punish: `Press to pendelty Opponent`,
  });
  useEffect(() => {
    if (pointDecider) {
      setAction(activeObj.add);
      return;
    }
    setAction(activeObj.foul);
  }, [pointDecider]);

  const messageRender = () => {
    if (active === 1) {
      return (
        <Flash>
          {pointDecider ? homeMessage.player1Add : homeMessage.player1Punish}
        </Flash>
      );
    }
    if (active === 2) {
      return (
        <Flash>
          {pointDecider ? homeMessage.player2Add : homeMessage.player2Punish}
        </Flash>
      );
    }
  };

  const clickHandler = (e) => {
    console.log(account.username);
    if (e.target.outerText === account.username.toUpperCase()) {
      setActive(1);
    }
    if (e.target.outerText === "Opponent".toUpperCase()) {
      setActive(2);
    }
  };
  return (
    <> 
    {login ?  <Grid
      container
      className={classes.playersBar}
      direction="row"
      justify="center"
      alignItems="center"
      wrap="wrap"
    >
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <Button
            onClick={clickHandler}
            variant="contained"
            color="primary"
            className={`${classes.btn} ${active === 1 ? classes.active : ""}`}
            style={{ color: `${active === 1 ? "red" : "white"}` }}
          >
            {account.username}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={clickHandler}
            variant="contained"
            color="secondary"
            className={`${classes.btn} ${active === 2 ? classes.active : ""}`}
            style={{ color: `${active === 2 ? "blue" : "white"}` }}
          >
            {"Opponent"}
          </Button>
        </Grid>
      </Grid>
      {active === 0 ? <Flash>Please Choose a Player</Flash> : messageRender()}
      <Grid item className={classes.ballsGrid}>
        <PopUpMenu classes={classes} socket={socket} />
        <PointSwitcher classes={classes} />
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.scoreDisplay}>
          <Grid item xs={6}>
            <Paper
              elevation={5}
              style={{
                background: "red",
                minHeight: "90%",
                fontSize: "90px",
                textAlign: "center",
                minWidth: "20vw",
              }}
            >
              {score.player1}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={5}
              style={{
                background: "blue",
                minHeight: "90%",
                fontSize: "90px",
                textAlign: "center",
                minWidth: "20vw",
              }}
            >
              {score.player2}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid> :  history.push('/signin') }
   
    </>
  );
}

export default Home;
const Flash = styled.h1`
  animation: 4s ${flashAnimation};
  margin: 1vw;
  animation-iteration-count: infinite;
  font-size: 2vw;
  color: white;
`;
