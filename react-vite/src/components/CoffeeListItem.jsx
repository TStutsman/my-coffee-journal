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
        <div className="coffee-list-item" style={{backgroundColor: coffee.color}}>
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
            <button className='delete-coffee-button' onClick={deleteCoffee}>
                <svg className='trash-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='currentColor'>
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
        </div>
    );
}

export default CoffeeListItem;