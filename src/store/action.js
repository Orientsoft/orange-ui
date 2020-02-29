import { ADD_NAV, CHANGE_KEY, DELETE_TAB, LOGIN, LOGOUT, UPDATE_LAST_ACTIVE_TIME } from './actionType';

export function addNav(data, state) {
    return {
      type: ADD_NAV,
      data,
      state,
    }
}

export function changeKey(key) {
    return {
      type: CHANGE_KEY,
      key,
    }
}

export function deleteTab(key){
    return {
        type: DELETE_TAB,
        key,
    };
}

export function loginAction(data){
  return {
      type: LOGIN,
      data
  };
}

export function updateActiveTimeAction(data){
  return {
      type: UPDATE_LAST_ACTIVE_TIME,
      data,
  };
}

export function logoutAction(){
  return {
      type: LOGOUT,
  };
}