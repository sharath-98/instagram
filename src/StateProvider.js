import React, {createContext, useContext, useReducer} from "react";
// wrap the entire app in the index,js file.
//creating the data layer
export const StateContext = createContext();

//distribute data to all the components in the app
// REDUCER will help in pushing and pulling of data from the data layer 
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={(useReducer(reducer, initialState))}>
        {children}
    </StateContext.Provider>
);

//getting data from the data layer
export const useStateValue = () => useContext(StateContext);