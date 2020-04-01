import React from 'react' 
import {connect} from 'react-redux'
import {startGetNotes,startAddNotes,startRemoveNotes} from '../actions/notesAction'
import NotesForm from '../components/notesForm'
import {Link} from 'react-router-dom'

class NotesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addTicket : false
        }
    }

    handleAddNotes = (formData) => {
        this.props.dispatch(startAddNotes(formData))
        this.setState({
            addTicket : false
        })
    }

    handleRemove = (id) => {
        this.props.dispatch(startRemoveNotes(id))
    }
    handleClick = () => {
        this.setState((prevState)=>{
            return {
                addTicket : !prevState.addTicket
            }
        })
    }


    render() {
        if(this.props.notes.length === 0 ){
            this.props.dispatch(startGetNotes())
        }
        return (
            <div className="container">
                <button onClick={this.handleClick}>add Notes</button>
                {this.state.addTicket && <NotesForm handleAddNotes={this.handleAddNotes}/>}
                <div class="row">
                    {
                        this.props.notes && this.props.notes.map(note=>{
                            return(
                                <div class="col-sm-3">
                                    <div class="card" style={{backgroundColor:"yellow"}}>
                                    <div class="card-body">
                                    <h5 class="card-title">{note.title}</h5>
                                    <h5 className="display-4" style={{fontSize:"20px"}}>category - {note.category.name}</h5>
                                    <p class="card-text">{note.body}</p>
                                    <button onClick={()=>{this.handleRemove(note._id)}}>remove</button>
                                    <button><Link to={`/notes/${note._id}`}>Edit</Link></button>
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes : state.notes
        
    }
}


export default connect(mapStateToProps)(NotesList)