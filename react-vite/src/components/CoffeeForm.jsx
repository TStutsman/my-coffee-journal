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
    const [ color, setColor ] = useState("#c5a487")

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
        <form id="coffee-form" onSubmit={handleSubmit} style={{backgroundColor: color}}>
            <h2>{ coffeeId ? 'Edit Coffee' : 'Add A Coffee' }</h2>

            <label>
                <span>Roaster</span>
                <input
                    type="text"
                    value={roaster}
                    onChange={e => setRoaster(e.target.value)}
                />
            </label>
            <label>
                <span>Farm</span>
                <input 
                    type="text"
                    value={farm}
                    onChange={(e) => setFarm(e.target.value)}
                />
            </label>

            <label>
                <span>Region</span>
                <input 
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
            </label>
            <label>
                <span>Country</span>
                <input 
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            
            <label>
                <span>Varietal</span>
                <input 
                    type="text"
                    value={varietal}
                    onChange={(e) => setVarietal(e.target.value)}
                />
            </label>
            <label>
                <span>Process</span>
                <input 
                    type="text"
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                />
            </label>
            <label>
                <span>Roast Profile</span>
                <input 
                    type="text"
                    value={roastProfile}
                    onChange={(e) => setRoastProfile(e.target.value)}
                />
            </label>
            <label>
                <ColorPicker color={color} setColor={setColor} />
            </label>
            <button type="submit">{ coffeeId ? 'Update' : 'Add' }</button>
        </form>
    )
}

export default CoffeeForm;