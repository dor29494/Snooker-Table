import React, { useState, useContext, useEffect, useRef } from "react";
import { SnookerContext } from "../../stateManager/stateManager";
import { IconButton } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
function ReturnButton({ classes }) {
  // const [lastScore,setLastScore] = useState(null)
  const { playersScore,setPlayersScore,lastScore,active} = useContext(SnookerContext);
  const [renderToggle,setRenderToggle] = useState(false)
  const returnHandler = () => {

};

  return (
    <>
      <IconButton aria-label="delete" className={classes.margin}>
        <RestoreIcon fontSize="large" onClick={returnHandler} />
      </IconButton>
    </>
  );
}

export default ReturnButton;
