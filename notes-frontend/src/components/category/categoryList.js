import React from 'react'
import {connect} from 'react-redux'
import {startGetCategory,startAddCategory,startEditCategory,startRemoveCategory} from '../../actions/categoryAction'
import {Link} from 'react-router-dom'

class CategoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            addCategory : false,
            editCategory : false,
            name : '',
            edit : '',
            editId : ''
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
            name : this.state.name
        }
        this.props.dispatch(startAddCategory(formData))
        this.setState({
            addCategory : false,
            name :''
        })
    }

    handleForm = () => {
        this.setState((prevState)=>{
            return{
            addCategory : !prevState.addCategory
            }
        })
    }

    handleEdit = (id) => {
        const category = this.props.categories.find(category=>category._id==id)
        this.setState({
            editCategory : true,
            edit : category.name,
            editId : id
        })
    }

    handleSubmitForm = () => {
        const formData = {
            name : this.state.edit
        }
        this.props.dispatch(startEditCategory({formData,id:this.state.editId}))
        this.setState({
            name : '',
            edit : '',
            editId : ''
        })
        
    }

    handleRemove = (id) => {
        const note = this.props.notes.filter(note=>note.category._id == id)
        if(note.length){
            alert('cannot delete the category which is associated with notes')
        }
        else{
            this.props.dispatch(startRemoveCategory(id))
        }
    }


    render(){
        if(this.props.categories.length === 0 ){
            this.props.dispatch(startGetCategory())
        }
        return (
            <div>
                <h2>Listing Category - {this.props.categories.length}</h2>
                <button onClick={this.handleForm}>add category</button>
                {
                    this.state.addCategory && (<form onSubmit={this.handleSubmit}>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                        <input type="submit" value="submit" />
                    </form>)
                }
                {
                  this.state.editCategory ?  (<form onSubmit={this.handleSubmitForm}>
                       <input type="text" name="edit" onChange={this.handleChange} value={this.state.edit} />
                        <input type="submit" value="save" />
                  </form>) :  this.props.categories.map(category=>{
                        return (
                            <div key={category._id}>
                                {/* <Link to={`/category/${category._id}`}><h4 className="display-4" style={{fontSize:"40px"}}>{category.name}</h4></Link> */}
                                <h4 className="display-4" style={{fontSize:"40px"}}>{category.name}</h4>
                                <button onClick={()=>{this.handleEdit(category._id)}}>edit</button>
                                <button onClick={()=>{this.handleRemove(category._id)}}>remove</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories : state.categories,
        notes : state.notes
    }
}

export default connect(mapStateToProps)(CategoryList)