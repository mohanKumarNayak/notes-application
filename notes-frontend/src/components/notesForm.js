import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { startUpdateNote } from "../actions/notesAction";
import {startGetCategory} from '../actions/categoryAction'

class NotesForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title : this.props.note ? this.props.note.title : '',
            body : this.props.note ? this.props.note.body : '',
            category : this.props.note ? this.props.note.category.name : ''
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
            title : this.state.title,
            body : this.state.body,
            category : this.state.category
        }
        this.props.note ? this.props.dispatch(startUpdateNote({formData,id:this.props.note._id})) : this.props.handleAddNotes(formData)
    }

    // componentWillMount = () => {
    //     this.props.note && this.setState({
    //         title : this.props.note ? this.props.note.title : '',
    //         body : this.props.note ? this.props.note.body : ''
    //     })
    // }


    render(){        
        console.log(this.state)
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.title} name="title" onChange={this.handleChange} /><br />
                    <textarea row="7" col="6" type="text" value={this.state.body} name="body" onChange={this.handleChange} /><br />
                    <select name="category" value={this.state.category} onChange={this.handleChange}>
                        <option key="key_1">select</option>
                        {
                           this.props.category && this.props.category.map(category=>{
                            return <option value={category._id} key={category._id}>{category.name}</option>
                            })
                        }
                    </select>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        note : state.notes.find(note=>note._id==id),
        category : state.categories
    }
}

export default withRouter(connect(mapStateToProps)(NotesForm))