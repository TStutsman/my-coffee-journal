import { CoffeeListItem } from "@components";
import { useStore } from '@context';
import { useState, useEffect } from "react";
import './CoffeeList.css';

function CoffeeList(){
    const { coffees, fetchCoffees } = useStore();
    const [focusedCoffee, setFocusedCoffee] = useState(0);

    useEffect(() => {
        fetchCoffees();
    }, [fetchCoffees]);

    return (
        <div className="coffee-list">
            { coffees.map((coffee, index) => (
                <CoffeeListItem 
                    key={coffee.id} 
                    coffee={coffee} 
                    show={focusedCoffee == index} 
                    focusCoffee={() => setFocusedCoffee(index)}
                />
            ))}
        </div>
    );
}

export default CoffeeList;