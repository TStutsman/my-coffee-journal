import { createContext, useCallback, useReducer, useState } from "react";
import { formatObject } from '@utils';

export const StoreContext = createContext();

const recipeSchema = {
    name: "",
    grinder: "",
    grindSize: "",
    dose: "",
    brewer: "",
    waterAmt: "",
    waterTemp: "",
    celsius: false,
    details: ""
}

function recipeReducer(state, action) {
    switch(action.type) {
        case "update": {
            return {...state, ...action.payload};
        }
        default: {
            console.log("Unknown recipe action type");
        }
    }
}

export function StoreProvider({ children }) {
    const [ coffees, setCoffees ] = useState([]);
    const [ brews, setBrews ] = useState({});
    const [ recipe, dispatch ] = useReducer(recipeReducer, recipeSchema)

    const fetchCoffees = useCallback(() => {
        fetch('/api/coffees', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            if(data.errors) return;
            setCoffees(data);
        });
    }, [setCoffees]);

    const fetchBrews = useCallback(() => {
        fetch('/api/brews', { credentials: 'include' })
        .then(res => res.json())
        .then(brews => brews.map(brew => formatObject(brew)))
        .then(brews => {
            const normalized = {inOrder: []};
            for(const brew of brews) {
                normalized[brew.id] = brew;
                normalized.inOrder.push(brew.id);
            }
            return normalized;
        })
        .then(brews => setBrews(brews));
    }, [setBrews]);

    const setRecipe = useCallback((newValue) => {
        dispatch({type: 'update', payload: newValue});
    }, [dispatch]);

    const store = {
        coffees,
        fetchCoffees,
        brews,
        fetchBrews,
        recipe,
        setRecipe
    }

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}