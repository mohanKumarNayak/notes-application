import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import notesReducer from '../reducers/notesReducer'
import categoryReducer from '../reducers/categoryReducer'
import userReducer from '../reducers/userReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducer,
        notes : notesReducer,
        categories : categoryReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore 