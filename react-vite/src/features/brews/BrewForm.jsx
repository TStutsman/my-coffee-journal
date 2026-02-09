import RecipeForm from '@brews/RecipeForm';
import Range from '@components/Range';
import { useModal, useStore } from '@context';
import { formatObject, formatRequest } from '@utils';
import { useEffect, useState } from "react";
import './BrewForm.css';

export default function BrewForm({ brewId, initialPage=0 }) {
    const { closeModal, setModalContent } = useModal();
    const { coffees, brews, recipe, setRecipe } = useStore();

    const [coffeeId, setCoffeeId] = useState(-1);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");
    const [page, setPage] = useState(initialPage);

    // const coffees = unlabeled.map(({id, roaster, farm, color}) => ({id, label: roaster + " - " + farm, color}));

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
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brew)
        })
        .then(res => res.ok ? closeModal() : console.log('error response:', res));
    }

    function nextPage(e) {
        if(e !== undefined) e.preventDefault();
        setPage(page+1);
    }

    function prevPage(e) {
        if(e !== undefined) e.preventDefault();
        setPage(page-1);
    }

    function selectCoffee(e) {
        e.preventDefault();
        setCoffeeId(+e.target.value)
        nextPage();
    }

    function loadRecipe(recipe) {
        setRecipe(recipe);
        setPage(page+1)
    }

    function adjustRecipe(e) {
        e.preventDefault();
        setModalContent(<RecipeForm />);
    }

    if(coffees.length < 1) return null;

    return (
        <div id='brew-form-modal'>
            <h2>Add a Brew</h2>
            <div id='brew-form-wrap'>
            <form id="brew-form">
                { page === 0 && <RecipeSelect load={loadRecipe}/> }

                { page === 1 && 
                <div id='recipe-summary-wrap'>
                    <h5>Would you like to adjust this recipe?</h5>
                    <div id='recipe-summary'>
                        <div>
                            <div>
                                <p className='summary-item-label'>Grinder</p>
                                <p>{recipe.grinder}</p>
                            </div>
                            <div>
                                <p className='summary-item-label'>Grind Size</p>
                                <p>{recipe.grindSize}</p>
                            </div>
                            <div>
                                <p className='summary-item-label'>Dose</p>
                                <p>{recipe.dose}g coffee</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='summary-item-label'>Brewer</p>
                                <p>{recipe.brewer}</p>
                            </div>
                            <div>
                                <p className='summary-item-label'>Water</p>
                                <p>{recipe.waterAmt}g water</p>
                            </div>
                            <div>
                                <p className='summary-item-label'>Temperature</p>
                                <p>{recipe.waterTemp} &deg;{recipe.celsius ? 'C' : 'F'}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='summary-item-label'>Details</p>
                                <p style={{whiteSpace: 'pre-line'}}>{recipe.details}</p>
                            </div>
                        </div>
                    </div>
                    <button id='adjust-recipe-btn' onClick={adjustRecipe}>Adjust This Recipe</button>
                </div>
                }

                { page === 2 && <CoffeeSelect {...{coffees, coffeeId, onClick: selectCoffee}} />}
                
                { page === 3 && 
                <div id='rating-notes-wrap'>
                    <h5>Rating & Notes</h5>
                    <div id='rating-notes-content'>
                        <div id='rating-container'>
                            <label htmlFor='rating'>Rating</label>
                            <div id='display-rating'>
                                <div>
                                    {Math.floor(rating)}
                                    <span>.{(rating % 1) * 10}</span>
                                </div>
                                &nbsp;/&nbsp;5
                            </div>
                            <Range id="rating" value={rating} onChange={e => setRating(e.target.value)} min={0} max={5} step={.5}/>
                        </div>
                        <div>
                            <label htmlFor='notes-ta'>Notes</label>
                            <textarea 
                            id='notes-ta' 
                            value={notes} 
                            onChange={e => setNotes(e.target.value)}
                            placeholder='Tasted like...&#10;Try grinding finer&#10;etc.'
                            />
                        </div>
                    </div>
                </div>
                }
            </form>
            </div>

            <div id='page-controls'>
                <button disabled={page === 0} onClick={prevPage}>&larr;</button>
                { page < 3 ?
                    <button onClick={nextPage}>&rarr;</button>
                    :
                    <button onClick={handleSubmit}>{brewId ? "Update Brew" : "Add Brew"}</button>
                }
            </div>
        </div>
    );
}


function RecipeSelect({ load }) {
    const [recipes, setRecipes] = useState([]);
    const { setModalContent } = useModal();

    useEffect(() => {
        fetch('/api/recipes/', {credentials: 'include'})
        .then(res => res.json())
        .then(recipes => recipes.map(recipe => formatObject(recipe)))
        .then(recipes => {
            setRecipes(recipes);
        });
    }, []);

    const onSelect = (recipeId) => {
        const recipe = recipes.find(recipe => recipe.id == recipeId);
        load(recipe);
    }

    return (
        <>
        <div id='recipe-select'>
            <h5>Choose a Recipe</h5>
            <div id="recipe-list">
                <div id='create-recipe-option' className="recipe-list-item" onClick={() => setModalContent(<RecipeForm />)}>
                    Create New Recipe +
                </div>
                { recipes.map(recipe => {
                    return (
                        <div 
                        className="recipe-list-item" 
                        key={recipe.id} 
                        onClick={() => onSelect(recipe.id)}
                        >
                            {recipe.name}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}


function CoffeeSelect({ coffees, coffeeId, onClick }) {
    return (
        <div id='coffee-select'>
            <h5>Choose a Coffee</h5>
            <div id="coffee-select-list">
                { coffees.map(coffee => {
                    const selected = +coffeeId === +coffee.id;
                    const className = selected ? "coffee-select-list-item selected" : "coffee-select-list-item";
                    return (
                        <button 
                        className={className}
                        key={coffee.id}
                        value={coffee.id}
                        onClick={onClick}
                        style={{color: `var(--${coffee.color})`}}
                        >
                            {coffee.farm}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}