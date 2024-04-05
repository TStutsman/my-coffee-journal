function BrewForm() {
    const coffees = ['Kenya', 'Ethiopia', 'Columbia'] // TODO: replace with user's coffees dispatch

    return (
        <form method="post" action="/api/brews">
            <label>
                Coffee:
                <select>
                    { coffees.map(coffee => (
                        <option key={coffee} value={coffee}>{coffee}</option>
                    ))}
                </select>
            </label>
            <label>
                Grinder:
                <input type="text" />
            </label>
            <label>
                Grind Size:
                <input type="text" />
            </label>
        </form>
    );
}

export default BrewForm;