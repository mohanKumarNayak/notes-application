const intialState = {}

const userReducer = (state=intialState,action) => {
    switch(action.type){
        case 'ADD_USER' : {
            return {...action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default userReducer