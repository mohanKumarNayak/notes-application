import React from 'react'
import {connect} from 'react-redux'
import {startRegisterUser} from '../../actions/userAction'

class UserRegistration extends React.Component{
    constructor(){
        super()
        this.state = {
            username : '',
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => {
            return this.props.history.push('/login')
        }
        this.props.dispatch(startRegisterUser({formData,redirect}))
    }
    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group" >
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Username" name="username" onChange={this.handleChange} value={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={this.handleChange} value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </div>
        )
    }
}


export default connect()(UserRegistration)