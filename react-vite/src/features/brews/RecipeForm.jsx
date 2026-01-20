import { useModal, useStore } from '@context';
import { formatRequest } from '@utils';
import { useState } from "react";
import ProgressBar from '@components/ProgressBar';
import './RecipeForm.css';
import BrewForm from './BrewForm';

function RecipeForm() {
    const { recipe, setRecipe } = useStore();
    const { setModalContent } = useModal();

    const [page, setPage] = useState(0);
    const [saved, setSaved] = useState(false);

    const set = (field, value) => {
        setRecipe({ ...recipe, [field]: value });
    }

    function noEmptyValues() {
        return Object.entries(recipe).every(([key, value]) => !!value || key == 'celsius');
    }

    function saveRecipe(e) {
        e.preventDefault();
        if(!noEmptyValues()) return;

        const recipeSnakeCase = formatRequest(recipe);
        delete recipeSnakeCase.id;

        fetch('/api/recipes/', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(recipeSnakeCase)
        })
        .then(res => res.status < 500 ? res.json() : undefined)
        .then(data => {
            if(!data?.errors) {
                setSaved(true);
            }
        });
    }

    function nextPage(e) {
        e.preventDefault();
        setPage(prev => Math.min(prev+1, 3));
    }

    function prevPage(e) {
        e.preventDefault();
        setPage(prev => Math.max(prev-1, 0));
    }

    function returnToFirstPage(e) {
        e.preventDefault();
        setPage(0);
    }

    function returnToBrew(e) {
        e.preventDefault();
        setModalContent(<BrewForm initialPage={2}/>);
    }

    return (
        <div id='recipe-form-modal'>
            <h2>Create New Recipe</h2>
            <ProgressBar percentage={(90*page/3) + 10} color={'var(--primary-2)'}/>
            <form id='recipe-form' autoComplete='off'>

                {page === 0 && <>
                <h5>Grind & Dose</h5>
                <div>
                    <label htmlFor='grinder'>Grinder</label>
                    <input id='grinder' type="text" value={recipe.grinder} onChange={e => set('grinder', e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='grind-size'>Grind Size</label>
                    <input id='grind-size' type="number" min={0} step={0.25} value={recipe.grindSize} onChange={e => set('grindSize', +e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='dose'>Dose (in grams)</label>
                    <input id='dose' type="number" min={0} step={0.01} value={recipe.dose} onChange={e => set('dose', +e.target.value)}/>
                </div>
                </>}

                {page === 1 && <>
                <h5>Brewer & Water</h5>
                <div>
                    <label htmlFor='brewer'>Brewer</label>
                    <input id='brewer' type="text" value={recipe.brewer} onChange={e => set('brewer', e.target.value)}/>
                </div>

                <div>
                    <label htmlFor='water-amount'>Water Amount (in grams)</label>
                    <input id='water-amount' type="number" min={0} step={0.01} value={recipe.waterAmt} onChange={e => set('waterAmt', +e.target.value)}/>
                </div>

                <div id="water-temp">
                    <div>
                        <label htmlFor='water-temp'>Water Temp</label>
                        <Switch value={recipe.celsius} changeFn={() => set('celsius', !recipe.celsius)}/>
                    </div>
                    <input id='water-temp' type="number" min={0} step={1} max={recipe.celsius ? 100 : 212} value={recipe.waterTemp} onChange={e => set('waterTemp', +e.target.value)}/>
                </div>
                </>}

                {page === 2 && <>
                <h5>Details</h5>
                <div>
                    <label htmlFor='recipe-details'>Details</label>
                    <textarea 
                        id='recipe-details' 
                        value={recipe.details} 
                        onChange={e => set('details', e.target.value)}
                        placeholder='50g bloom for 45s&#10;250g pour for 30s&#10;etc...'
                    />
                </div>
                </>}

                {page === 3 && <>
                <h5>Summary</h5>
                <div>
                    <label htmlFor='recipe-name'>Recipe Name</label>
                    <input id='recipe-name' type="text" value={recipe.name} onChange={e => set('name', e.target.value)}/>
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
                    <div id='recipe-summary-buttons' className='button-group'>
                        <button id='recipe-edit-btn' onClick={returnToFirstPage}>Edit</button>
                        <button id='recipe-save-btn' disabled={recipe.name == "" || saved} onClick={saveRecipe}>
                            {saved ? 'Saved!': 'Save'}
                        </button>
                    </div>
                </div>
                </>}
            </form>

            <div id='page-controls'>
                {page < 3 ? 
                <>
                <button disabled={page === 0} onClick={prevPage}>&larr;</button>
                <button onClick={nextPage}>&rarr;</button>
                </>
                :
                <button style={{width: '100%'}} onClick={returnToBrew}>Return to Brew</button>
                }
            </div>
        </div>
    );
}

export default RecipeForm;

function Switch({ value, changeFn }) {
    return (
        <div id="degrees-switch" onClick={changeFn}>
            <div style={{left: '6px'}} className='switch-label'>F</div>
            <div style={{right: '4px'}} className='switch-label'>C</div>

            <div id="switch-circle" className={value ? "celsius" : "fahrenheit"}>
                {value ? <>&deg;C</> : <>&deg;F</>}
            </div>
        </div>
    )
}

// creates an empty object and initializes any fields passed to the arg object
// function createRecipe(obj = {}) {
//     return {
//         name: "",
//         grinder: "",
//         grindSize: "",
//         dose: "",
//         brewer: "",
//         waterAmt: "",
//         waterTemp: "",
//         celsius: false,
//         details: "",
//         ...obj
//     }
// }