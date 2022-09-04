const initialState=[]
const reducer = (state =initialState, action) => {
  switch (action.type) {
    case "GET-COMMENTS-FILTER":
    return action.payload
    default:
      return state;
  }
};

export default reducer;
