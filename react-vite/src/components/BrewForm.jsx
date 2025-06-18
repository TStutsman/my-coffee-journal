import { useEffect, useState } from "react";
import { useModal } from '@context';
import { StarRating } from '@components';
import './BrewForm.css';

function BrewForm({ brewId }) {
    const { closeModal } = useModal();

    const [coffees, setCoffees] = useState([])
    const [coffeeId, setCoffeeId] = useState("");
    const [grinder, setGrinder] = useState("");
    const [grindSize, setGrindSize] = useState("");
    const [dose, setDose] = useState("");
    const [brewer, setBrewer] = useState("");
    const [waterAmount, setWaterAmount] = useState("");
    const [waterTemp, setWaterTemp] = useState("");
    const [celsius, setCelsius] = useState(false);
    const [rating, setRating] = useState("0.0");
    const [recipe, setRecipe] = useState("");
    const [notes, setNotes] = useState("");
    const [tempRating, setTempRating] = useState("0.0")

    const resetRating = () => setTempRating(rating);
    const setBothRating = (rating) => {
        setRating(rating);
        setTempRating(rating);
    }

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
                if(data.dose) setDose(Number(data.dose));
                if(data.water_amt) setWaterAmount(Number(data.water_amt));
                if(data.water_temp) setWaterTemp(Number(data.water_temp));
                if(data.notes) setNotes(data.notes);
                if(data.recipe) setRecipe(data.recipe);
                if(data.celsius) setCelsius(data.celsius);
                if(data.rating) setBothRating(data.rating);
            });
        }
    }, [brewId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const brew = {
            coffeeId,
            grinder,
            grindSize,
            dose,
            brewer,
            water_amt:waterAmount,
            water_temp:waterTemp,
            celsius,
            recipe,
            notes,
            rating
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
                <span>Dose</span>
                <input type="number" min={0} step={0.01} value={dose} onChange={e => setDose(+e.target.value)}/>
            </label>
            <label>
                <span>Brewer</span>
                <input type="text" value={brewer} onChange={e => setBrewer(e.target.value)}/>
            </label>
            <label>
                <span>Water Amount</span>
                <input type="number" min={0} step={0.01} value={waterAmount} onChange={e => setWaterAmount(+e.target.value)}/>
            </label>
            <label>
                <span>Water Temp</span>
                <input type="number" min={0} step={1} max={celsius ? 100 : 212} value={waterTemp} onChange={e => setWaterTemp(+e.target.value)}/>
            </label>
            <label>
                <span>Notes</span>
                <textarea value={notes} onChange={e => setNotes(e.target.value)}/>
            </label>
            <label>
                <span>Recipe</span>
                <textarea value={recipe} onChange={e => setRecipe(e.target.value)}/>
            </label>
            <label>
                <span>Rating</span>
                <StarRating rating={tempRating} hoverRating={setTempRating} setRating={setBothRating} resetRating={resetRating}/>
            </label>

            <button type="submit">{brewId ? "Update Brew" : "Add Brew"}</button>
        </form>
    );
}

export default BrewForm;