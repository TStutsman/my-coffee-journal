import './CoffeeListItem.css'

function CoffeeListItem({ coffee }){
    return (
        <div className="coffee-list-item">
            <p>Country: {coffee.country}</p>
            <p>Region: {coffee.region || 'unknown'}</p>
            <p>Farm: {coffee.farm || 'unknown'}</p>
            <p>Varietal: {coffee.varietal || 'unknown'}</p>
            <p>Process: {coffee.process || 'unknown'}</p>
            <p>Roasted By: {coffee.roaster}</p>
            <p>Roast Profile: {coffee.roastProfile || 'unknown'}</p>
        </div>
    );
}

export default CoffeeListItem;