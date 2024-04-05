function BrewList(){
    const brews = [1, 2, 3, 4, 5]
    return (
        <div className="brew-list">
            { brews.map(brew => (
                <p key={brew}>Brew {brew}</p>
            ))}
        </div>
    );
}

export default BrewList;