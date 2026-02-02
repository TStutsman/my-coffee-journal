import { useEffect, useState } from "react";
import { useModal } from '@context';
import { ColorPicker } from '@coffees';
import './CoffeeForm.css';

function CoffeeForm({ coffeeId }) {
    const { closeModal } = useModal();

    const [formErrors, setFormErrors] = useState({});

    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [farm, setFarm] = useState("");
    const [varietal, setVarietal] = useState("");
    const [process, setProcess] = useState("");
    const [roaster, setRoaster] = useState("");
    const [roastProfile, setRoastProfile] = useState("");
    const [color, setColor] = useState("brown");

    const colorScheme = () => {
        if(window !== undefined && window.matchMedia){
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    }

    const handleSubmit = e => {
        e.preventDefault()

        const coffee = {
            country, region, farm, varietal, process, roaster, roastProfile, color
        }
        
        const url = coffeeId ? `/api/coffees/${coffeeId}` : '/api/coffees/';
        const method = coffeeId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coffee)
        })
        .then(res => res.json())
        .then(data => {
            if(data.errors){
                setFormErrors(data.errors);
            } else {
                closeModal();
            }
        })
    }

    useEffect(() => {
        if(coffeeId) {
            fetch(`/api/coffees/${coffeeId}`)
            .then(res => res.json())
            .then(data => {
                setCountry(data.country)
                setRegion(data.region)
                setFarm(data.farm)
                setVarietal(data.varietal)
                setProcess(data.process)
                setRoaster(data.roaster)
                setRoastProfile(data.roast_profile)
                setColor(data.color)
            });
        }
    }, [coffeeId]);

    const formStyle = colorScheme() === 'light' ? {backgroundColor: `var(--${color})`} : {backgroundColor: 'var(--dp-01)'};
    const buttonStyle = colorScheme() === 'light' ? {} : {color: `var(--text-${color})`}
    const labelStyle = colorScheme() === 'light' ? {} : {borderColor: `var(--${color})`};

    return (
        <form id="coffee-form" onSubmit={handleSubmit} style={formStyle}>
            <h2>{ coffeeId ? 'Edit Coffee' : 'Add A Coffee' }</h2>

            <div>
                <label style={labelStyle}>
                    <span>Roaster</span>
                    <input
                        type="text"
                        value={roaster}
                        onChange={e => setRoaster(e.target.value)}
                    />
                </label>
                {formErrors?.roaster && <p className="form-error">{formErrors.roaster}</p>}
            </div>

            <label style={labelStyle}>
                <span>Farm</span>
                <input 
                    type="text"
                    value={farm}
                    onChange={(e) => setFarm(e.target.value)}
                />
            </label>

            <label style={labelStyle}>
                <span>Region</span>
                <input 
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
            </label>

            <div>
                <label style={labelStyle}>
                    <span>Country</span>
                    <input 
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                {formErrors?.country && <p className="form-error">{formErrors.country}</p>}
            </div>
            
            <label style={labelStyle}>
                <span>Varietal</span>
                <input 
                    type="text"
                    value={varietal}
                    onChange={(e) => setVarietal(e.target.value)}
                />
            </label>

            <div>
                <label style={labelStyle}>
                    <span>Process</span>
                    <input 
                        type="text"
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                    />
                </label>
                {formErrors?.process && <p className="form-error">{formErrors.process}</p>}
            </div>

            <label style={labelStyle}>
                <span>Roast Profile</span>
                <input 
                    type="text"
                    value={roastProfile}
                    onChange={(e) => setRoastProfile(e.target.value)}
                />
            </label>

            <label>
                <span>Pick a color</span>
                <ColorPicker color={color} setColor={setColor} />
            </label>
            <button type="submit" style={buttonStyle}>{ coffeeId ? 'Update' : 'Add' }</button>
        </form>
    )
}

export default CoffeeForm;