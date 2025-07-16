import { RecipeForm, RecipeSelect, StarRating } from '@brews';
import { If } from '@components';
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
    const [page, setPage] = useState(0);

    const coffees = unlabeled.map(({id, roaster, farm, color}) => ({id, label: roaster + " - " + farm, color}));

    useEffect(() => {
        if(brewId) {
            const { coffeeId, rating, notes } = brews[brewId];
            setCoffeeId(coffeeId);
            setRating(rating);
            setNotes(notes || "");
            setPage(1);
    
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

    function nextPage(e) {
        e.preventDefault();
        setPage(page+1);
    }

    function prevPage(e) {
        e.preventDefault();
        setPage(page-1);
    }

    function loadRecipe(recipe) {
        setRecipe(recipe);
        setPage(page+1)
    }

    if(coffees.length < 1) return null;

    return (
        <form id="brew-form" onSubmit={handleSubmit}>
            <If value={page === 0}>
                <h3>Which recipe are you using today?</h3>
                <RecipeSelect load={loadRecipe}/>
            </If>

            <If value={page === 1}>
                <RecipeForm />
            </If>

            <If value={page === 2}>
                <h3>Which coffee are you brewing?</h3>
                <label>
                    <span>Coffee</span>
                    <select 
                        value={coffeeId} 
                        onChange={e => setCoffeeId(+e.target.value)}
                    >
                        <option value="" disabled>Select a coffee</option>
                        { coffees.map(coffee => (
                            <option key={coffee.id} value={coffee.id}>
                                {coffee.label}
                            </option>
                        ))}
                    </select>
                </label>
            </If>
            
            <If value={page === 3}>
                <h3>How was your brew?</h3>
                <label>
                    <span id='notes-label'>Notes</span>
                    <textarea id='notes-ta' value={notes} onChange={e => setNotes(e.target.value)}/>
                </label>
                <label>
                    <span>Rating</span>
                    <StarRating rating={rating} setRating={value => setRating(value)} />
                </label>
            </If>

            <div id='page-controls'>
                <button disabled={page === 0} onClick={prevPage}>&lt;</button>
                { page < 3 ?
                    <button onClick={nextPage}>&#10003;</button>
                    :
                    <button type="submit">{brewId ? "Update Brew" : "Add Brew"}</button>
                }
            </div>
        </form>
    );
}

export default BrewForm;