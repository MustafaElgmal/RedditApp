import {combineReducers} from 'redux'
import  user from './user.reducer'
import post from './post.reducer'
import comments from './comment.reducer'

export const reducers=combineReducers({
    user,
    post,
    comments
})