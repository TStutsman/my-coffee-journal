import { Recipe, StarRating } from '@brews';
import { useModal, useStore } from '@context';
import { formatRequest } from '@utils';
import { useEffect, useState } from "react";
import './BrewForm.css';

function BrewForm({ brewId }) {
    const { closeModal } = useModal();
    const { coffees:unlabeled, brews, recipe, setRecipe } = useStore();

    const [coffeeId, setCoffeeId] = useState("");
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");

    const coffees = unlabeled.map(({id, roaster, farm}) => ({id, label: roaster + " - " + farm}));

    useEffect(() => {
        if(brewId) {
            const { coffeeId, rating, notes } = brews[brewId];
            setCoffeeId(coffeeId);
            setRating(rating);
            setNotes(notes || "");
    
            const recipe = {...brews[brewId], details: brews[brewId].recipe};
            delete recipe.coffeeId;
            delete recipe.rating;
            delete recipe.notes;
            delete recipe.coffee;
            setRecipe(recipe);
        }
    }, [brewId, brews, setRecipe]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const brew = formatRequest({coffeeId, rating, notes, ...recipe, recipe: recipe.details});
        delete brew.details;
        delete brew.name;
        delete brew.id;

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

            <Recipe />

            <label>
                <span>Notes</span>
                <textarea value={notes} onChange={e => setNotes(e.target.value)}/>
            </label>
            <label>
                <span>Rating</span>
                <StarRating rating={rating} setRating={value => setRating(value)} />
            </label>

            <button type="submit">{brewId ? "Update Brew" : "Add Brew"}</button>
        </form>
    );
}

export default BrewForm;