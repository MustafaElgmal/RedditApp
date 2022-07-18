 const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET-POSTS":
      return action.payload;
    case "GET-STATUS":
      return action.payload
    default:
      return state;
  }
};

export default reducer


