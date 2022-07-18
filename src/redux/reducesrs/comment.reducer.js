const reducer=(state=[],action)=>{
    switch(action.type){
        case "GET-COMMENTS":
            return action.payload
        default:
            return state
    }

}

export default reducer