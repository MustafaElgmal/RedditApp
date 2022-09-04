import {combineReducers} from 'redux'
import  user from './user.reducer'
import posts from './posts.reducer'
import postsFilter from './postsFilter.reducer'
import comments from './comments.reducer'
import commentsFilter from './commentsFilter.reducer'

export const reducers=combineReducers({
    user,
    posts,
    postsFilter,
    comments,
    commentsFilter
})