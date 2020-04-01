import React from 'react'
import {connect } from 'react-redux'
import {startLoginUser} from '../../actions/userAction'

class UserLogin extends React.Component{
    constructor(){
        super()
        this.state = {
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
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => {
            return this.props.history.push('/notes')
        }
        this.props.dispatch(startLoginUser({formData,redirect}))
    }
    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
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

export default connect()(UserLogin)