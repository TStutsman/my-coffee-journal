import { CoffeeListItem } from "@components";
import { useEffect, useState } from "react";
import './CoffeeList.css';

function CoffeeList(){
    const [coffees, setCoffees] = useState([]);
    const [focusedCoffee, setFocusedCoffee] = useState(0);

    useEffect(() => {
        fetch('/api/coffees/').then(res => res.json()).then(coffees => setCoffees(coffees));
    }, []);

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