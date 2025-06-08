import { useEffect, useState } from "react";
import { useModal } from '@context';
import './BrewForm.css';

function BrewForm({ brewId }) {
    const { closeModal } = useModal();

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
                    label: `${coffee.roaster} - ${coffee.farm}`
                }
            }))
        });
    }, [])

    useEffect(() => {
        if(brewId) {
            fetch(`/api/brews/${brewId}`)
            .then(res => res.json())
            .then(data => {
                setCoffeeId(data.coffee.id);
                setGrinder(data.grinder);
                setGrindSize(data.grind_size);
                setBrewer(data.brewer);
                setRatio(data.ratio);
            });
        }
    }, [brewId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const brew = {
            coffeeId, grinder, grindSize, brewer, ratio
        }

        const url = brewId ? `/api/brews/${brewId}` : '/api/brews/';
        fetch(url, {
            method: brewId ? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brew)
        })
        .then(res => res.ok ? closeModal() : console.log('error response:', res));
    }

    if(coffees.length < 1) return null;

    return (
        <form id="brew-form" onSubmit={handleSubmit}>
            <h3>{brewId ? 'Edit': 'Add a'} Brew</h3>
            <label>
                <span>Coffee</span>
                <select 
                    value={coffeeId} 
                    onChange={e => setCoffeeId(+e.target.value)}
                >
                    <option value="" disabled>Select a coffee</option>
                    { coffees.map(coffee => (
                        <option key={coffee.id} value={coffee.id}>{coffee.label}</option>
                    ))}
                </select>
            </label>
            <label>
                <span>Grinder</span>
                <input type="text" value={grinder} onChange={e => setGrinder(e.target.value)}/>
            </label>
            <label>
                <span>Grind Size</span>
                <input type="number" min={0} step={0.25} value={grindSize} onChange={e => setGrindSize(e.target.value)}/>
            </label>
            <label>
                <span>Brewer</span>
                <input type="text" value={brewer} onChange={e => setBrewer(e.target.value)}/>
            </label>
            <label>
                <span>Ratio 1/</span>
                <input type="number" min={0} step={0.0001} value={ratio} onChange={e => setRatio(+e.target.value)}/>
            </label>
            <button type="submit">{brewId ? "Update Brew" : "Add Brew"}</button>
        </form>
    );
}

export default BrewForm;