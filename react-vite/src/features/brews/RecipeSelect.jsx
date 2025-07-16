import { createRecipe } from '@brews';
import { formatObject } from '@utils';
import { useEffect, useState } from 'react';
import './RecipeSelect.css';

function RecipeSelect({ load }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/api/recipes')
        .then(res => res.json())
        .then(recipes => recipes.map(recipe => formatObject(recipe)))
        .then(recipes => {
            setRecipes(recipes);
        });
    }, []);

    const onSelect = (recipeId) => {
        const recipe = recipes.find(recipe => recipe.id == recipeId);
        load(recipe || createRecipe());
    }

    return (
        <div id="recipe-list">
            <div className="recipe-list-item" onClick={() => onSelect(-1)}>
                Create a new recipe
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
    );
}

export default RecipeSelect;