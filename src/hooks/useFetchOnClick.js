import { useReducer, useEffect } from "react";

const initialState = {loading:false, data:null, error:null }

const fetchReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'LOAD':
            return {loading:true, data:null, error:null};
        case 'SUCCESS':
            return {loading:false, data:payload, error:null};
        case 'ERROR':
            return {loading:false, data:null, error:payload};
        default:
            return state;
    }
}

export const useFetchOnClick = (fetchFunction, searchInput, imperialUnit) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const onClick = async() => {
        if(searchInput){
            dispatch({ type: 'LOAD' });
            try {
                const response = await fetchFunction(searchInput, imperialUnit);
                dispatch({ type: 'SUCCESS', payload:response })
                console.log(response)
            } catch(error) {
                dispatch({type: 'ERROR', payload:error})
            }
        }
    }
    
    const onChangeUnit = async() => {
        
        
    }

    return {state, onClick, onChangeUnit}
}