function CoffeeList(){
    const coffees = [1, 2, 3, 4, 5]
    return (
        <div className="brew-list">
            { coffees.map(coffee => (
                <p key={coffee}>Coffee {coffee}</p>
            ))}
        </div>
    );
}

export default CoffeeList;