import React from "react";
import {
    FormControlLabel,
    Switch
} from "@material-ui/core";
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {pointDeciderState} from "../../stateManager/atoms"



function PointSwitcher({ classes}) {
 
      const [pointHandler,setpointHandler] = useRecoilState(pointDeciderState)


    return (
        <>
          <FormControlLabel
            control={<Switch checked={pointHandler} onChange={()=>
              setpointHandler(!pointHandler)
            } name="checkedA" />}
            label="Change"
          />
        </>
    )
}

export default PointSwitcher;
