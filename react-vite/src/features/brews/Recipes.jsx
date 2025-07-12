import { Book, Bookmark } from '@assets';
import { If } from '@components';
import { useEffect, useState } from 'react';
import './Recipes.css';

function Recipes({ load, save, validate, name, setName }) {
    const [recipes, setRecipes] = useState([]);
    const [showList, setShowList] = useState(false);
    const [focused, setFocused] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch('/api/recipes')
        .then(res => res.json())
        .then(recipes => {
            setRecipes(recipes);
        });
    }, []);

    const onSelect = (recipeId) => {
        const recipe = recipes.find(recipe => recipe.id == recipeId);
        load(recipe);
        setSaved(true);
    }

    return (
        <div id="recipe-row">
            <button id="load-recipe" onClick={(e) => e.preventDefault() || setShowList(!showList)}>
                <Book/>
                <If value={showList}>
                    <div id="recipe-list">
                        { recipes.map(recipe => {
                            return <div className="recipe-list-item" key={recipe.id} onClick={() => onSelect(recipe.id) && setShowList(false)}>{recipe.name}</div>
                        })}
                    </div>
                </If>
            </button>
            {
                focused
                ? <textarea id="recipeName" placeholder="Name Your Recipe" autoFocus={focused} onFocus={(e) => e.target.select()} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={e => e.key == "Enter" && setFocused(false)}/>
                : <span onClick={() => setFocused(true)}>{name || "New Recipe"}</span>
            }
            <button id="save-recipe" onClick={(e) => validate(e) ? save() : setFocused(true)}>
                <Bookmark fill={saved}/>
            </button>
        </div>
    );
}

export default Recipes;