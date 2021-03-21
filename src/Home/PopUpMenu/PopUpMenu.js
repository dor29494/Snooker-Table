import React,{useEffect,useState} from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Avatar, Box, Button, Container, Fab ,IconButton} from "@material-ui/core";
import { ballColors, ballAddObj, foulsList } from "../../services/exportsFile";
import RestoreIcon from "@material-ui/icons/Restore";
import {pointDeciderState,scoreState,activeState,lastAction,alertState,accountState} from "../../stateManager/atoms"
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function PopUpMenu({ classes ,socket}) {
  const [active,setActive] = useRecoilState(activeState)
  const [alertObj,setAlert] = useRecoilState(alertState)
  const [score,setScore] = useRecoilState(scoreState)
  const [account, setAccount] = useRecoilState(accountState);
  const [action, setLastAction] = useRecoilState(lastAction)
  const pointDecider = useRecoilValue(pointDeciderState)


  const [messageData,setMessageData] = useState({
    state: { score:'', alert:'' },
    secret: '16151260696166542610',
    socketId: '3fbc77dac0c245be'
  });

  useEffect(()=>{
    // console.log('step 2 , emiting alert...')
    let newMsgData = {...messageData}
    newMsgData.state.alert = alertObj
    setMessageData(newMsgData)
    socket.emit('multiplex-statechanged', newMsgData);
  },[score])
  
  
  useEffect(() => {
    // console.log('emiting score...')
    let newMsgData = {...messageData}
    newMsgData.state.score = score;
    setMessageData(newMsgData)
    // console.log(newMsgData)
    socket.emit('multiplex-statechanged', newMsgData);
  }, [score]);

  const returnHandler = () => {
    const { ...data } = score;
    let actionObjClone = {...action}
    if(active === 1){
      if(data.player1 > 0){
        const newArray = [...action.player1];
        const lastPoint = newArray[newArray.length - 1];
      if (isNaN(lastPoint) === false) {
        newArray.pop();
        setLastAction({...actionObjClone,player1: newArray});
        const thingtoAdd = data.player1 + lastPoint;
        setScore({ ...data, player1: thingtoAdd });
      }
      }
 
  }
  if(active === 2){
    if(data.player2 > 0){
    const newArray = [...action.player2];
    const lastPoint = newArray[newArray.length - 1];
  if (isNaN(lastPoint) === false) {
    newArray.pop();
    setLastAction({...actionObjClone,player1: newArray});
    const thingtoAdd = data.player2 + lastPoint;
    setScore({ ...data, player2: thingtoAdd });
  }
}
}
  };

  const ballAdder = (point, popupState,sourceOfAction) => {
    // console.log('step 1 , setting alertObj')
    let objHolder = {...alertObj}
    const { ...data } = score;
    if (pointDecider) {
      const pointsToAdd = ballAddObj[point];
      if (active === 1 && sourceOfAction === 'add') {
        data.player1 = score.player1 + pointsToAdd;
        let actionObjClone = {...action}
        let actionClone = [...action.player1]
        setLastAction({...actionObjClone, player1:[...actionClone, -pointsToAdd]});
        setScore(data);
        objHolder.alert = true
        objHolder.alertMsg = `${account.username} just score a ${pointsToAdd} points!`
        setAlert(objHolder)
        return;
      }
      if (active === 2 && sourceOfAction === 'add') {
        let actionObjClone = {...action}
        let actionClone = [...action.player1]
        data.player2 = score.player2 + pointsToAdd;
        setLastAction({...actionObjClone, player2:[...actionClone, -pointsToAdd]});
        setScore(data);
        setAlert({
          alert: true,
          alertMsg: `Opponent just score a ${pointsToAdd} points!`
        })
        return;
      }
      if (active === 0) {
        alert("Please choose a Player!");
        return;
      }
    }
    //// ------ fouls --------- /////
    if (active === 1 && sourceOfAction === 'foul') {
      let actionObjClone = {...action}
        let actionClone = [...action.player1]
        data.player2 = score.player2 + point;
        setLastAction({...actionObjClone, player2:[...actionClone, -point]});
      setScore(data);
      setAlert({
        alert: true,
        alertMsg: `${account.username} got fouled by ${point} points!`
      })
      return;
    }
    if (active === 2 && sourceOfAction === 'foul') {
      let actionObjClone = {...action}
      let actionClone = [...action.player1]
      data.player1 = score.player1 + point;
      setLastAction({...actionObjClone, player1:[...actionClone, -point]});
      setScore(data);
      setAlert({
        alert: true,
        alertMsg: `Opponent got fouled by ${point} points!`
      })
      return;
    }
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Container justify="center" className={classes.ballWrapper}>
            {pointDecider
              ? ballColors.map((color, idx) => (
                  <Avatar
                    key={idx}
                    onClick={(e) => {
                      ballAdder(color, popupState,'add');
                    }}
                    style={{
                      background: color,
                      cursor: "pointer",
                      margin: "0.2vw",
                      padding: "0.5vw",
                    }}
                  >
                    {idx + 1}
                  </Avatar>
                ))
              : foulsList.map((foul, idx) => (
                  <Avatar
                    style={{
                      background: "red",
                      cursor: "pointer",
                      margin: "0.5vw",
                      padding: "1vw",
                    }}
                    key={idx}
                    onClick={(e) => {
                      ballAdder(foul, popupState,'foul');
                    }}
                  >
                    {foul}
                  </Avatar>
                ))}
            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={returnHandler}
            >
              <RestoreIcon fontSize="large" />
            </IconButton>
          </Container>
        </>
      )}
    </PopupState>
  );
}

export default PopUpMenu;
