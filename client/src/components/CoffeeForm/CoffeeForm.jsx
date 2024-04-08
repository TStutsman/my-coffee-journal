import { useState } from "react";
import './CoffeeForm.css';

function CoffeeForm() {
    const [ country, setCountry ] = useState("");
    const [ region, setRegion ] = useState("");
    const [ farm, setFarm ] = useState("");
    const [ varietal, setVarietal ] = useState("");
    const [ process, setProcess ] = useState("");
    const [ roaster, setRoaster ] = useState("");
    const [ roastProfile, setRoastProfile ] = useState("");

    const handleSubmit = e => {
        e.preventDefault()

        const coffee = {
            country, region, farm, varietal, process, roaster, roastProfile
        }
        
        fetch('/api/coffees/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coffee)
        });
    }

    return (
        <form id="coffee-form" method="post" onSubmit={handleSubmit}>
            <label>
                Country:
                <input 
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            <label>
                Region:
                <input 
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
            </label>
            <label>
                Farm:
                <input 
                    type="text"
                    value={farm}
                    onChange={(e) => setFarm(e.target.value)}
                />
            </label>
            <label>
                Varietal:
                <input 
                    type="text"
                    value={varietal}
                    onChange={(e) => setVarietal(e.target.value)}
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
            <label>
                Roast Profile:
                <input 
                    type="text"
                    value={roastProfile}
                    onChange={(e) => setRoastProfile(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CoffeeForm;