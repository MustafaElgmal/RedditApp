
const initialState = JSON.parse(localStorage.getItem('user'))|| {user: {}, isLoggedIn: false}

 const reducer=(state=initialState,action)=>{
    switch(action.type){
        case'LOGIN':
        return action.payload
        case 'LOGOUT':
        return action.payload
        default:
            return state
    }
}
export default reducer