import React from 'react';
import List from './components/List'
import {BrowserRouter,Link,Route} from 'react-router-dom'
import NotesForm from '../src/components/notesForm'
import CategoryList from '../src/components/category/categoryList'
import {connect} from 'react-redux'
import UserRegistration from './components/users/userRegistration'
import UserLogin from './components/users/userLogin'
import { startLogoutData} from './actions/userAction'

function App(props) {
  const handleLogout = () => {
    const status = window.confirm('are you sure to logout')
    if(status){
      props.dispatch(startLogoutData())
    }
  }
  return (
    <BrowserRouter>
    <div>
    <h2>Notes App</h2>
    {
      Object.keys(props.user).length > 0 ? <div>
        <Link to="/notes">Notes</Link>
       <Link to="/category">Category</Link>
       <Link to="/logout" onClick={handleLogout}>Logout</Link>
      </div> : <div>
        <Link to="/">Registration</Link>
        <Link to="/login">Login</Link>
      </div>
    }

      

      <Route path="/notes" component={List} exact={true}/>
      <Route path="/notes/:id" component={NotesForm} />
      <Route path="/category" component={CategoryList} exact={true} />

      <Route path="/" component={UserRegistration} exact={true} />
      <Route path="/login" component={UserLogin} />
      
    </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps)(App)
