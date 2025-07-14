import { Book } from '@assets';
import { If } from '@components';
import { formatObject } from '@utils';
import { useEffect, useState } from 'react';
import './RecipeSelect.css';

function RecipeSelect({ load }) {
    const [recipes, setRecipes] = useState([]);
    const [showList, setShowList] = useState(false);

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
        load(recipe);
    }

    return (
        <button id="load-recipe" onClick={(e) => e.preventDefault() || setShowList(!showList)}>
            <Book/>
            <If value={showList}>
                <div id="recipe-list">
                    { recipes.map(recipe => {
                        return (
                            <div 
                                className="recipe-list-item" 
                                key={recipe.id} 
                                onClick={() => onSelect(recipe.id) && setShowList(false)}
                                >
                                    {recipe.name}
                            </div>
                        );
                    })}
                </div>
            </If>
        </button>
    );
}

export default RecipeSelect;