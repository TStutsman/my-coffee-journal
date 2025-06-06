import { useNavigate } from 'react-router';
import './BrewListItem.css';

function BrewListItem({ brew }) {
    const { id, coffee, grinder, grind_size: grindSize, brewer, ratio} = brew;
    
    // parsed grindSize and ratio (no trailing zeros)
    const pGrindSize = Number(grindSize);
    const pRatio = Number(ratio);

    const navigate = useNavigate();

    const deleteBrew = () => {
        fetch(`/api/brews/${id}`,
            {
                method: 'DELETE'
            }
        ).then(res => console.log(res.status));
    }

    return (
        <div className="brew-list-item">
            <p>Coffee: {coffee}</p>
            <p>Grinder: {grinder}</p>
            <p>Grind Size: {pGrindSize}</p>
            <p>Brewer: {brewer}</p>
            <p>Ratio: 1/{pRatio}</p>

            <button onClick={() => navigate(`/brews/edit/${id}`)}>Edit</button>
            <button onClick={deleteBrew}>Delete</button>
        </div>
    );
}

export default BrewListItem