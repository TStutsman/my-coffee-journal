import './CoffeeListItem.css'

function CoffeeListItem({ coffee }){
    return (
        <div className="coffee-list-item" style={{borderColor: coffee.color}}>
            <p>Country: {coffee.country}</p>
            <p>Region: {coffee.region || 'unknown'}</p>
            <p>Farm: {coffee.farm || 'unknown'}</p>
            <p>Varietal: {coffee.varietal || 'unknown'}</p>
            <p>Process: {coffee.process || 'unknown'}</p>
            <p>Roasted By: {coffee.roaster}</p>
            <p>Roast Profile: {coffee.roast_profile || 'unknown'}</p>
        </div>
    );
}

export default CoffeeListItem;