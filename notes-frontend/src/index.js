import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {startGetCategory} from '../src/actions/categoryAction'
import {startGetNotes} from '../src/actions/notesAction'
import {startLoggedIn}  from '../src/actions/userAction'

const store = configureStore()

store.dispatch(startGetCategory())
store.dispatch(startGetNotes())

if(localStorage.getItem('token')){
    store.dispatch(startLoggedIn(localStorage.getItem('token')))
}

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)



ReactDOM.render(jsx, document.getElementById('root'));