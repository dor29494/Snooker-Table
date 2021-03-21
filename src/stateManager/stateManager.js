import React, {useState, useEffect,useRef} from "react";

const SnookerContext = React.createContext();
const { Provider } = SnookerContext;

const StateManager = ({ children }) => {
    const [bottomNavValue, setBottomNavValue] = useState(0)
    const [playersLogin,setPlayersLogin] = useState(false)
    const [active, setActive] = useState(0);
    const [lastAction,setLastAction] = useState([])
    const [account,setAccount] = useState({
      email: '',
      password: '',
      username: ''
    })
    const [pointDecider,setPointDecider] = useState(true)
    const [playersScore,setPlayersScore] = useState({
      player1: 0,
      player2: 0,
    })
    const [lastScore,setLastScore] = useState({
      player1: 0,
      player2: 0,
    })
    const [action,setAction] = useState('')
    // state = values to display
    const state = {
        bottomNavValue,
        active,
        account,
        playersScore,
        playersLogin,
        pointDecider,
        lastScore,
        action,
        lastAction,
        
    };
    // actions = callbacks to invoke
    const actions = {
        setBottomNavValue,
        setActive,
        setAccount,
        setPlayersScore,
        setPlayersLogin,
        setPointDecider,
        setLastScore,
        setAction,
        setLastAction,
      
    
    };
  
    return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
  };
  
  export { StateManager, SnookerContext };
  