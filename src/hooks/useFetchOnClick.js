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

export const useFetchOnClick = (fetchFunction, searchInput, imperialUnit, geolocation) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const fetchWeather = async () => {
            if(searchInput){
                dispatch({ type: 'LOAD' });
                try {
                    const response = await fetchFunction(null, searchInput, imperialUnit);
                    dispatch({ type: 'SUCCESS', payload:response })
                }catch(error){
                    dispatch({type: 'ERROR', payload:error})
                }
            }
        };
        fetchWeather();
    }, [fetchFunction, searchInput, imperialUnit]);

    useEffect(() => {
        const fetchWeather = async () => {
            if(geolocation){
                dispatch({ type: 'LOAD' });
                try {
                    const response = await fetchFunction(geolocation, null, imperialUnit);
                    dispatch({ type: 'SUCCESS', payload:response })
                }catch(error){
                    dispatch({type: 'ERROR', payload:error})
                }
            }
        }
        fetchWeather();
    }, [fetchFunction, geolocation, imperialUnit])

    return state;
}