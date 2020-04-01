import axios from "axios"


export const startRegisterUser = (obj) => {
    return(dispatch)=>{
        axios.post('http://localhost:3040/users/register',obj.formData)
            .then((response)=>{
                const user = response.data
                if(user._id){
                alert('user registered successfully')
                obj.redirect()
                }
                else{
                    alert(response.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            
    }
}

export const addUser =(user) => {
    return {type : 'ADD_USER' , payload : user}
}

export const startLoggedIn = (token) => {
    return(dispatch)=>{
    axios.get('http://localhost:3040/users/account',{
        headers : {
            'x-auth' : token
        }
    })
    .then((response)=>{
        if(response.data._id){
            dispatch(addUser(response.data))
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

export const startLoginUser = (obj) => {
    return(dispatch)=>{
        axios.post('http://localhost:3040/users/login',obj.formData)
            .then((response)=>{
                const token = response.data.token
                if(token){
                    localStorage.setItem('token',token)
                    axios.get('http://localhost:3040/users/account',{
                        headers :{ 
                            'x-auth' : localStorage.getItem('token')}
                    })
                    .then((response)=>{
                        if(response.data._id){
                            dispatch(addUser(response.data))
                            alert('successfully logged in')
                            obj.redirect()
                        }
                    })
                }
                else{
                    alert('invalid email or password')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startLogoutData = () =>{
    return(dispatch)=>{
        axios.delete('http://localhost:3040/users/logout',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response)=>{
                alert('successfully logged out')
                localStorage.removeItem('token')
                window.location.href = '/login'
            })
    }
}