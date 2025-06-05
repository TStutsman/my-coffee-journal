import { useNavigate } from 'react-router';
import './BrewListItem.css';

function BrewListItem({ brew }) {
    const { id, coffee, grinder, grind_size: grindSize, brewer, ratio} = brew;
    
    // parsed grindSize and ratio (no trailing zeros)
    const pGrindSize = Number(grindSize);
    const pRatio = Number(ratio);

    const navigate = useNavigate();

    return (
        <div className="brew-list-item">
            <p>Coffee: {coffee}</p>
            <p>Grinder: {grinder}</p>
            <p>Grind Size: {pGrindSize}</p>
            <p>Brewer: {brewer}</p>
            <p>Ratio: 1/{pRatio}</p>

            <button onClick={() => navigate(`/brews/update/${id}`)}>update</button>
        </div>
    );
}

export default BrewListItem