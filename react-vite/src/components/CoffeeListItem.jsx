import { useNavigate } from 'react-router'
import './CoffeeListItem.css'

function CoffeeListItem({ coffee }){
    const navigate = useNavigate();

    const deleteCoffee = () => {
        fetch(`/api/coffees/${coffee.id}`,
            {
                method: 'DELETE'
            }
        ).then(res => console.log(res.status));
    }

    return (
        <div className="coffee-list-item" style={{borderColor: coffee.color}}>
            <p>Country: {coffee.country}</p>
            {coffee.region &&
            <p>Region: {coffee.region || 'unknown'}</p>
            }
            {coffee.farm && 
            <p>Farm: {coffee.farm || 'unknown'}</p>
            }
            <p>Varietal: {coffee.varietal || 'unknown'}</p>
            <p>Process: {coffee.process || 'unknown'}</p>
            <p>Roasted By: {coffee.roaster}</p>
            <p>Roast Profile: {coffee.roast_profile || 'unknown'}</p>

            <button onClick={() => navigate(`/coffees/edit/${coffee.id}`)}>Edit</button>
            <button onClick={deleteCoffee}>Delete</button>
        </div>
    );
}

export default CoffeeListItem;