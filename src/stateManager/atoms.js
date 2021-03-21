import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

  export const socketAlertState = atom({
    key: 'socketAlertState',
    default: {
      alert: false,
      alertMsg: '',
    },
  });
  export const alertState = atom({
    key: 'alertState',
    default: {
      alert: false,
      alertMsg: '',
    },
  });
  export const appLoading = atom({
    key: 'appLoading',
    default: true,
  });
  export const displayState = atom({
    key: 'displayState',
    default: null,
  });

export const loginRemover = atom({
    key: 'loginRemover',
    default: false,
  });
export const playersLogin = atom({
    key: 'playersLogin',
    default: false,
  });
  export const activeState = atom({
    key: 'activeState',
    default: 0,
  });

  export const lastAction = atom({
    key: 'lastAction',
    default: {player1: [],
             player2: []},
  });
  export const accountState = atom({
    key: 'accountState',
    default: {
      email: '',
      password: '',
      username: ''
    },
  });
  export const pointDeciderState = atom({
    key: 'pointDeciderState',
    default: true,
  });
  export const scoreState = atom({
    key: 'scoreState',
    default: {
      player1: 0,
      player2: 0,
    },
  });
  export const actionState = atom({
    key: 'actionState',
    default: '',
  });
  