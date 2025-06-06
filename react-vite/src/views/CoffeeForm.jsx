import { useEffect, useState } from "react";
import './CoffeeForm.css';
import { useParams, useNavigate } from "react-router";

function CoffeeForm() {
    const navigate = useNavigate();
    const { coffeeId } = useParams();

    const [ country, setCountry ] = useState("");
    const [ region, setRegion ] = useState("");
    const [ farm, setFarm ] = useState("");
    const [ varietal, setVarietal ] = useState("");
    const [ process, setProcess ] = useState("");
    const [ roaster, setRoaster ] = useState("");
    const [ roastProfile, setRoastProfile ] = useState("");
    const [ color, setColor ] = useState("")

    const createCoffee = e => {
        e.preventDefault()

        const coffee = {
            country, region, farm, varietal, process, roaster, roastProfile, color
        }
        
        fetch('/api/coffees/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coffee)
        })
        .then(res => res.ok && navigate('/coffees'));
    }

    const updateCoffee = e => {
        e.preventDefault()

        const coffee = {
            country, region, farm, varietal, process, roaster, roastProfile, color
        }
        
        fetch(`/api/coffees/${coffeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coffee)
        }).then(res => res.ok && navigate('/coffees'));
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
        <form id="coffee-form" method="post" onSubmit={coffeeId ? updateCoffee : createCoffee}>
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
            <label>
                Color:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CoffeeForm;