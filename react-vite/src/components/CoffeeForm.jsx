import { useEffect, useState } from "react";
import { useModal } from '@context';
import { ColorPicker } from '@components';
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
    const [ color, setColor ] = useState("#141414")

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
            <form id="coffee-form" onSubmit={handleSubmit} style={{backgroundColor: color}}>
                <h2>{ coffeeId ? 'Edit Coffee' : 'Add A Coffee' }</h2>

                <label>
                    Roaster:
                    <input
                        type="text"
                        placeholder="Roaster"
                        value={roaster}
                        onChange={e => setRoaster(e.target.value)}
                    />
                </label>
                <label>
                    Farm:
                    <input 
                        type="text"
                        placeholder="Farm"
                        value={farm}
                        onChange={(e) => setFarm(e.target.value)}
                    />
                </label>

                <label>
                    Region:
                    <input 
                        type="text"
                        placeholder="Region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </label>
                <label>
                    Country:
                    <input 
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                
                <label>
                    Varietal:
                    <input 
                        type="text"
                        placeholder="Varietal"
                        value={varietal}
                        onChange={(e) => setVarietal(e.target.value)}
                    />
                </label>
                <label>
                    Process:
                    <input 
                        type="text"
                        placeholder="Process"
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                    />
                </label>
                <label>
                    Roast Profile:
                    <input 
                        type="text"
                        placeholder="Roast Profile"
                        value={roastProfile}
                        onChange={(e) => setRoastProfile(e.target.value)}
                    />
                </label>
                <label>
                    <ColorPicker color={color} setColor={setColor} />
                </label>
                <button type="submit">{ coffeeId ? 'Update' : 'Add' }</button>
            </form>
        </div>
    )
}

export default CoffeeForm;