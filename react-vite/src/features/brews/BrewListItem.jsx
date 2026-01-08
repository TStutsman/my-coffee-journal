import BrewDetails from '@brews/BrewDetails';
import { useModal } from '@context';
import { formatDate } from '@utils';
import { useState } from 'react';
import './BrewListItem.css';

function BrewListItem({ brew:initialBrew }) {
    const [brew, setBrew] = useState(initialBrew);

    const { setModalContent } = useModal();
    
    // parsed data (no trailing zeros)
    const pGrindSize = Number(brew.grindSize);
    const pDose = Number(brew.dose);
    const pWater = Number(brew.waterAmt);
    const pRating = Number(brew.rating)
    const pDate = formatDate(brew.date);

    return (
        <div className='brew-list-item' onClick={() => setModalContent(<BrewDetails {...{brew, setBrew}} />)}>
            <div className='brew-title'>
                <div>
                    <h4>{pDate}</h4>
                    <h5>{pRating + '/5'}</h5>
                </div>
                <h5>{brew.brewer}</h5>
            </div>

            <div className='brew-content'>
                    <div>
                        <p style={{color: `var(--text-${brew.coffee.color})`}}>{brew.coffee.roaster} {brew.coffee.farm}</p>
                    </div>
                    <div>
                        <span>{pDose}g coffee</span>
                        { brew.grindSize && <span className='secondary-details'>grind setting {pGrindSize}</span> }
                    </div>
                    <div>
                        <span>{pWater}g water</span>
                        { brew.waterTemp && <span className='secondary-details'>{brew.waterTemp}&deg;{brew.celsius ? "C" : "F"}</span> }
                    </div>
                    <div>
                        { brew.notes && <p>Notes: {brew.notes}</p> }
                    </div>
            </div>
        </div>
    );
}

export default BrewListItem;