import React, { useState, useContext } from "react";
import { SnookerContext } from "../stateManager/stateManager";
import {
  BottomNavigationAction,
  BottomNavigation,
  Box,
} from "@material-ui/core";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import GameIcon from "@material-ui/icons/SportsEsports";
import Person from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
function BotNav({ classes }) {
  const [checked, setChecked] = React.useState([0]);
  const { bottomNavValue, setBottomNavValue } = useContext(SnookerContext);

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      textAlign="center"
      margin="auto"
    >
      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue) => {
          setBottomNavValue(newValue);
        }}
        showLabels
        className={classes.bottomMenu}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Single-Play" icon={<FitnessCenter />} />
        <BottomNavigationAction label="Online" icon={<GameIcon />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Box>
  );
}

export default BotNav;
