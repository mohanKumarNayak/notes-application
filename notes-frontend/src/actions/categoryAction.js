import axios from 'axios'

export const getCategory = (category) => {
    return {type : 'GET_CATEGORY' , payload : category}
}

export const startGetCategory = () => {
    return(dispatch)=>{
        axios.get('http://localhost:3040/category',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((res)=>{
                dispatch(getCategory(res.data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const addCategory = (category) => {
    return {type : 'ADD_CATEGORY',payload:category}
}

export const startAddCategory = (formData) => {
    return(dispatch)=>{
        axios.post('http://localhost:3040/category',formData,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((res)=>{
                alert('category added successfully')
                dispatch(addCategory(res.data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const editCategory = (category) => {
    return {type : 'EDIT_CATEGORY',payload:category}
}

export const startEditCategory = (obj) => {
    return(dispatch)=>{
        axios.put(`http://localhost:3040/category/${obj.id}`,obj.formData,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((res)=>{
                dispatch(editCategory(res.data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const removeCategory = (category) => {
    return {type : 'REMOVE_CATEGORY',payload:category}
}


export const startRemoveCategory = (id) => {
    return(dispatch)=>{
        axios.delete(`http://localhost:3040/category/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((res)=>{
                dispatch(removeCategory(res.data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}