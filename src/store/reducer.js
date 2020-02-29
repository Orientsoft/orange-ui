import { ADD_NAV, CHANGE_KEY, DELETE_TAB, LOGIN, LOGOUT, UPDATE_LAST_ACTIVE_TIME } from "./actionType";

export function navageData(state = [], action) {
  switch (action.type) {
    case ADD_NAV: {
      const tmp = state.map(v => ({ ...v }));
      const has = tmp.find(v => v.id === action.data.id);
      if (has) {
        const ret = tmp.map(v => {
          if (v.id === action.data.id) {
            return { ...action.data, state: action.state };
          }
          return v;
        });
        return ret;
      }
      tmp.push({
        ...action.data,
        state: action.state
      });
      return tmp;
    }
    case DELETE_TAB: {
      const tmp = state.filter(v => v.id !== action.key);
      return tmp;
    }
    case LOGOUT: {
      return [];
    }
    default:
      return state;
  }
}

export function activeKey(state = "0", action) {
  switch (action.type) {
    case CHANGE_KEY: {
      return action.key;
    }
    case LOGOUT: {
      return "index";
    }
    default:
      return state;
  }
}

export function appStatus(state = { isAuth: false, token: "" }, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        isAuth: true,
        expir: action.data.expir,
        // expir: 60,
        createTime: Date.now(),
        token: action.data.access_token,
        refresh_token: action.data.refresh_token,
      };
    }
    case UPDATE_LAST_ACTIVE_TIME:{
      console.log('action.data', action.data);
        return { ...state, ...action.data };
    }
    case LOGOUT: {
      return { isAuth: false, token: "" };
    }
    default:
      return state;
  }
}
