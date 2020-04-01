const intialState = []

const categoryReducer = (state=intialState,action) => {
    switch(action.type){
        case 'GET_CATEGORY' : {
            return [...action.payload]
        }
        case 'ADD_CATEGORY' : {
            return [...state,action.payload]
        }
        case 'EDIT_CATEGORY' : {
            return state.map(category=>{
                if(category._id == action.payload._id){
                    return action.payload
                }
                else{
                    return category
                }
            })
        }
        case 'REMOVE_CATEGORY' : {
            return state.filter(category=>category._id !== action.payload._id)
        }
        default : {
            return [...state]
        }
    }
}

export default categoryReducer