//  REDUCER will help in pushing and pulling of data from the data layer
//  initial state of the data layer(React Context API/ REDUX)

export const initialState={
    user:null,
};

const reducer = (state, action) =>{

    console.log(action)
    switch(action.type){
        case 'SIGN_OUT':
            return {
                ...state, user:null, username: null
            }
        case 'SET_USER':
            return {
                ...state,
                user:action.user,
                username: action.username
            }
        default:
            return state;
    }

};

export default reducer;



