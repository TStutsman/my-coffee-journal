import { useEffect, useState } from "react";
import CoffeeListItem from "@components";

function CoffeeList(){
    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        fetch('/api/coffees/').then(res => res.json()).then(coffees => setCoffees(coffees));
    }, [])

    return (
        <div className="brew-list">
            { coffees.map(coffee => (
                <CoffeeListItem key={coffee.id} coffee={coffee}/>
            ))}
        </div>
    );
}

export default CoffeeList;