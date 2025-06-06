import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './BrewForm.css';

function BrewForm() {
    const navigate = useNavigate();

    const { brewId } = useParams();

    const [coffees, setCoffees] = useState([])
    const [coffeeId, setCoffeeId] = useState("");
    const [grinder, setGrinder] = useState("");
    const [grindSize, setGrindSize] = useState("");
    const [brewer, setBrewer] = useState("");
    const [ratio, setRatio] = useState(16);

    useEffect(() => {
        fetch('/api/coffees').then(res => res.json()).then(coffees => {
            setCoffees(coffees.map(coffee => {
                return {
                    id: coffee.id,
                    label: `${coffee.roaster} - ${coffee.country}`
                }
            }))
        });
    }, [])

    useEffect(() => {
        if(brewId) {
            fetch(`/api/brews/${brewId}`).then(res => res.json()).then(brew => {
                setCoffeeId(brew.coffeeId);
                setGrinder(brew.grinder);
                setGrindSize(brew.grindSize);
                setBrewer(brew.brewer);
                setRatio(brew.ratio);
            });
        }
    }, [brewId]);

    const submitNew = async e => {
        e.preventDefault();

        const new_brew = {
            coffeeId, grinder, grindSize, brewer, ratio
        }

        await fetch('/api/brews/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_brew)
        }).then(res => res.json()).then(brew => Object.assign(new_brew, brew));

        if(new_brew.id) {
            console.log(new_brew);
            navigate('/brews');
        }
    }

    const submitUpdate = async e => {
        e.preventDefault();

        const brew_update = {
            coffeeId, grinder, grindSize, brewer, ratio
        }

        let status;
        await fetch(`/api/brews/${brewId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brew_update)
        }).then(res => status = res.status);

        if(status && status < 400) {
            console.log(brew_update);
            navigate('/brews');
        }
    }

    if(coffees.length < 1) return null;

    return (
        <form id="brew-form" onSubmit={brewId ? submitUpdate : submitNew}>
            <label>
                Coffee:
                <select value={coffeeId} onChange={e => setCoffeeId(+e.target.value)}>
                    <option value="" disabled>Select a coffee</option>
                    { coffees.map(coffee => (
                        <option key={coffee.id} value={coffee.id}>{coffee.label}</option>
                    ))}
                </select>
            </label>
            <label>
                Grinder:
                <input type="text" value={grinder} onChange={e => setGrinder(e.target.value)}/>
            </label>
            <label>
                Grind Size:
                <input type="number" min={0} step={0.01} value={grindSize} onChange={e => setGrindSize(e.target.value)}/>
            </label>
            <label>
                Brewer:
                <input type="text" value={brewer} onChange={e => setBrewer(e.target.value)}/>
            </label>
            <label>
                Ratio: 1/
                <input type="number" min={0} step={0.0001} value={ratio} onChange={e => setRatio(+e.target.value)}/>
            </label>
            <button type="submit">{brewId ? "Update Brew" : "Add Brew"}</button>
        </form>
    );
}

export default BrewForm;