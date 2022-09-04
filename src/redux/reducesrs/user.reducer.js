const local = localStorage.getItem("user");
const initialState =
  local === null ? { token: "", isLoggedIn: false } : JSON.parse(local);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
export default reducer;
