import { useEffect, useState } from "react";
import { useModal } from '@context';
import { StarRating } from '@brews';
import './BrewForm.css';

function BrewForm({ brewId }) {
    const { closeModal } = useModal();

    const [coffees, setCoffees] = useState([])
    const [coffeeId, setCoffeeId] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [grinder, setGrinder] = useState("");
    const [grindSize, setGrindSize] = useState("");
    const [dose, setDose] = useState("");
    const [brewer, setBrewer] = useState("");
    const [waterAmount, setWaterAmount] = useState("");
    const [waterTemp, setWaterTemp] = useState("");
    const [celsius, setCelsius] = useState(false);
    const [rating, setRating] = useState("0.0");
    const [notes, setNotes] = useState("");
    const [details, setDetails] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [tempRating, setTempRating] = useState("0.0")

    const resetRating = () => setTempRating(rating);
    const setBothRating = (rating) => {
        setRating(rating);
        setTempRating(rating);
    }

    useEffect(() => {
        fetch('/api/coffees')
        .then(res => res.json())
        .then(coffees => {
            setCoffees(coffees.map(coffee => {
                return {
                    id: coffee.id,
                    label: `${coffee.roaster} - ${coffee.farm}`
                }
            }))
        });
        fetch('/api/recipes')
        .then(res => res.json())
        .then(recipes => {
            setRecipes(recipes);
        });
    }, [])

    useEffect(() => {
        if(brewId) {
            fetch(`/api/brews/${brewId}`)
            .then(res => res.json())
            .then(data => {
                if(data.coffee?.id) setCoffeeId(data.coffee.id);
                if(data.grinder) setGrinder(data.grinder);
                if(data.grind_size) setGrindSize(data.grind_size);
                if(data.brewer) setBrewer(data.brewer);
                if(data.dose) setDose(Number(data.dose));
                if(data.water_amt) setWaterAmount(Number(data.water_amt));
                if(data.water_temp) setWaterTemp(Number(data.water_temp));
                if(data.celsius) setCelsius(data.celsius);
                if(data.recipe) setDetails(data.recipe);
                if(data.notes) setNotes(data.notes);
                if(data.rating) setBothRating(data.rating);
            });
        }
    }, [brewId]);

    const loadRecipe = (recipeId) => {
        const recipe = recipes.find(recipe => recipe.id == recipeId);

        if(recipe.coffee?.id) setCoffeeId(recipe.coffee.id);
        if(recipe.grinder) setGrinder(recipe.grinder);
        if(recipe.grind_size) setGrindSize(recipe.grind_size);
        if(recipe.brewer) setBrewer(recipe.brewer);
        if(recipe.dose) setDose(Number(recipe.dose));
        if(recipe.water_amt) setWaterAmount(Number(recipe.water_amt));
        if(recipe.water_temp) setWaterTemp(Number(recipe.water_temp));
        if(recipe.celsius) setCelsius(recipe.celsius);
        if(recipe.details) setDetails(recipe.details);
        if(recipe.notes) setNotes(recipe.notes);
        if(recipe.rating) setBothRating(recipe.rating);
        if(recipe.name) setRecipeName(recipe.name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const brew = {
            coffeeId,
            grinder,
            grindSize,
            dose,
            brewer,
            water_amt: waterAmount,
            water_temp: waterTemp,
            celsius,
            notes,
            recipe: details,
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
            <div id="recipe-row">
                <label>
                    <select 
                        value={""}
                        onChange={e => loadRecipe(+e.target.value)}
                    >
                        <option value="" disabled>Select a recipe</option>
                        { recipes.map(recipe => (
                            <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                        ))}
                    </select>
                </label>
                <span>{recipeName ? recipeName : "New Recipe"}</span>
                <button id="save-recipe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="100%" height="100%" fill="currentColor"><path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z"/></svg>
                </button>
            </div>
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
            <div id="water-temp">
                <label>
                    <span>Water Temp</span>
                    <input type="number" min={0} step={1} max={celsius ? 100 : 212} value={waterTemp} onChange={e => setWaterTemp(+e.target.value)}/>
                </label>
                <div id="degrees-switch" onClick={() => setCelsius(!celsius)}>
                    <div id="switch-circle" className={celsius ? "celsius" : "fahrenheit"}>
                        {celsius ? <>&deg;C</> : <>&deg;F</>}
                    </div>
                </div>
            </div>
            <label>
                <span>Notes</span>
                <textarea value={notes} onChange={e => setNotes(e.target.value)}/>
            </label>
            <label>
                <span>Details</span>
                <textarea value={details} onChange={e => setDetails(e.target.value)}/>
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