import {combineReducers} from 'redux'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import blogsReducer from '../store/Blog/blogReducer';


const rootReducer = combineReducers({
    blogs: blogsReducer,
})

const middleWares = [thunk];

const store  = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWares))
)

export default store;