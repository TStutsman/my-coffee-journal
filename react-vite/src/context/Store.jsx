import { createContext, useCallback, useState } from "react";

export const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [ coffees, setCoffees ] = useState([]);
    const [ brews, setBrews ] = useState([]);

    const fetchCoffees = useCallback(() => {
        fetch('/api/coffees')
        .then(res => res.json())
        .then(coffees => setCoffees(coffees));
    }, [setCoffees]);

    const fetchBrews = useCallback(() => {
        fetch('/api/brews')
        .then(res => res.json())
        .then(brews => setBrews(brews));
    }, [setBrews]);

    const store = {
        coffees,
        fetchCoffees,
        brews,
        fetchBrews
    }

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}