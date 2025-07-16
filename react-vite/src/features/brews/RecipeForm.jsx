import { Bookmark } from '@assets';
import { useStore } from '@context';
import { formatRequest } from '@utils';
import { useEffect, useState } from 'react';
import './RecipeForm.css';

function Recipe() {
    const { recipe, setRecipe } = useStore();

    const [focused, setFocused] = useState(false);
    const [saved, setSaved] = useState(false);

    const set = (field, value) => {
        setRecipe({ ...recipe, [field]: value });
        setSaved(false);
    }

    useEffect(() => {
        setSaved(recipe?.id);
    }, [recipe])

    function saveRecipe() {
        const recipeSnakeCase = formatRequest(recipe);
        delete recipeSnakeCase.id;

        fetch('/api/recipes/', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(recipeSnakeCase)
        })
        .then(res => {
            if(res.ok) {
                setSaved(true);
            } else{
                console.log('error response:', res);
            } 
        });
    }

    function noEmptyValues(e) {
        e.preventDefault();
        return Object.entries(recipe).every(([key, value]) => !!value || key == 'celsius');
    }

    return (
        <>
            <h3>{recipe?.id ? 'Any changes to this recipe?' : 'Create a new recipe'}</h3>
            <div id='recipe-row'>
            {
                focused
                ? <textarea id="recipe-name" placeholder="Name Your Recipe" autoFocus={focused} onFocus={(e) => e.target.select()} value={recipe.name} onChange={(e) => set('name', e.target.value)} onKeyDown={e => ["Enter", "Tab"].includes(e.key) && setFocused(false)}/>
                : <span onClick={() => setFocused(true)}>{recipe.name || "New Recipe"}</span>
            }
            <button id="save-recipe" disabled={saved} onClick={(e) => noEmptyValues(e) ? saveRecipe() : setFocused(true)}>
                <Bookmark fill={saved}/>
            </button>
            </div>
            <label>
                <span>Grinder</span>
                <input type="text" value={recipe.grinder} onChange={e => set('grinder', e.target.value)}/>
            </label>
            <label>
                <span>Grind Size</span>
                <input type="number" min={0} step={0.25} value={recipe.grindSize} onChange={e => set('grindSize', +e.target.value)}/>
            </label>
            <label>
                <span>Dose</span>
                <input type="number" min={0} step={0.01} value={recipe.dose} onChange={e => set('dose', +e.target.value)}/>
            </label>
            <label>
                <span>Brewer</span>
                <input type="text" value={recipe.brewer} onChange={e => set('brewer', e.target.value)}/>
            </label>
            <label>
                <span>Water Amount</span>
                <input type="number" min={0} step={0.01} value={recipe.waterAmt} onChange={e => set('waterAmt', +e.target.value)}/>
            </label>
            <div id="water-temp">
                <label>
                    <span>Water Temp</span>
                    <input type="number" min={0} step={1} max={recipe.celsius ? 100 : 212} value={recipe.waterTemp} onChange={e => set('waterTemp', +e.target.value)}/>
                </label>
                <div id="degrees-switch" onClick={() => set('celsius', !recipe.celsius)}>
                    <div id="switch-circle" className={recipe.celsius ? "celsius" : "fahrenheit"}>
                        {recipe.celsius ? <>&deg;C</> : <>&deg;F</>}
                    </div>
                </div>
            </div>
            <label>
                <span>Details</span>
                <textarea value={recipe.details} onChange={e => set('details', e.target.value)}/>
            </label>
        </>
    );
}

export default Recipe;