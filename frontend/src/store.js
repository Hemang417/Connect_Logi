import { createStore } from "redux";

const initialState = {
  sidebarShow: true,
  latestMessageVisible: true, // 👈 NEW
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    case "toggleLatestMessage":
      return {
        ...state,
        latestMessageVisible: !state.latestMessageVisible,
      };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
