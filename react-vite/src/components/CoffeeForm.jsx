import { useEffect, useState } from "react";
import { useModal } from '@context';
import './CoffeeForm.css';

function CoffeeForm({ coffeeId }) {
    const { closeModal } = useModal();

    const [ country, setCountry ] = useState("");
    const [ region, setRegion ] = useState("");
    const [ farm, setFarm ] = useState("");
    const [ varietal, setVarietal ] = useState("");
    const [ process, setProcess ] = useState("");
    const [ roaster, setRoaster ] = useState("");
    const [ roastProfile, setRoastProfile ] = useState("");
    const [ color, setColor ] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        const coffee = {
            country, region, farm, varietal, process, roaster, roastProfile, color
        }
        
        const url = coffeeId ? `/api/coffees/${coffeeId}` : '/api/coffees';
        const method = coffeeId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coffee)
        }).then(res => res.ok && closeModal());
    }

    useEffect(() => {
        if(coffeeId) {
            fetch(`/api/coffees/${coffeeId}`)
            .then(res => res.json())
            .then(data => {
                setCountry(data.country)
                setRegion(data.region)
                setFarm(data.farm)
                setVarietal(data.varietal)
                setProcess(data.process)
                setRoaster(data.roaster)
                setRoastProfile(data.roast_profile)
                setColor(data.color)
            });
        }
    }, [coffeeId]);

    return (
        <div className="form-container">
            <form id="coffee-form" onSubmit={handleSubmit}>
                <h2>{ coffeeId ? 'Edit Coffee' : 'Add A Coffee' }</h2>

                <label>
                    Roaster:
                    <input
                        type="text"
                        value={roaster}
                        onChange={e => setRoaster(e.target.value)}
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
                    Region:
                    <input 
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </label>
                <label>
                    Country:
                    <input 
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
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
                    Roast Profile:
                    <input 
                        type="text"
                        value={roastProfile}
                        onChange={(e) => setRoastProfile(e.target.value)}
                    />
                </label>
                <label>
                    Color:
                    <input
                        id="coffee-color-picker"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default CoffeeForm;