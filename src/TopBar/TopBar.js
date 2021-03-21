import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem } from '@material-ui/core';
import { useHistory,Link } from "react-router-dom";
import {playersLogin,appLoading} from "../stateManager/atoms"
import {useRecoilState} from  "recoil"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar() {

  const [loading, setLoading] = useRecoilState(appLoading);
  const [login,setLogin]  = useRecoilState(playersLogin);
  const classes = useStyles();
  let history = useHistory()
  const loginSwitcher = ()=>{
    localStorage.removeItem('SnookerPass')
    setLogin(false)
    setLoading(true)

  }

  return (
    <div className={classes.topBar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SnookerBoard
          </Typography>
          <ListItem button component={Link} to="/" color="inherit">Home</ListItem>
          <Button color="inherit" component={Link} to="/show" >Show</Button>
          <Button color="inherit" onClick={loginSwitcher} component={Link} to="/signin">{login ? 'Logout' : 'Login'}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
// }
  }