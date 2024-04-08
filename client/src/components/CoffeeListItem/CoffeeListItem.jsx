import './CoffeeListItem.css'

function CoffeeListItem({ coffee }){
    const { country, region, farm, varietal, process, roaster, roast_profile: roastProfile} = coffee;
    return (
        <div className="coffee-list-item">
            <p>Country: {country}</p>
            <p>Region: {region || 'unknown'}</p>
            <p>Farm: {farm || 'unknown'}</p>
            <p>Varietal: {varietal || 'unknown'}</p>
            <p>Process: {process || 'unknown'}</p>
            <p>Roasted By: {roaster}</p>
            <p>Roast Profile: {roastProfile || 'unknown'}</p>
        </div>
    );
}

export default CoffeeListItem;