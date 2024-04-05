import { useState } from "react";

function CoffeeForm() {
    const [ origin, setOrigin ] = useState("");
    const [ process, setProcess ] = useState("");
    const [ roaster, setRoaster ] = useState("");

    return (
        <form method="post" action="/api/coffees">
            <label>
                Origin:
                <input 
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                />
            </label>
            <label>
                Process:
                <input 
                    type="text"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                />
            </label>
            <label>
                Roaster:
                <input
                    type="text"
                    value={roaster}
                    onChange={e => setRoaster(e.target.value)}
                />
            </label>
        </form>
    )
}

export default CoffeeForm;