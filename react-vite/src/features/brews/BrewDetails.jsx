import DeleteModalWrap from '@components/DeleteModalWrap';
import BrewForm from '@brews/BrewForm';
import { useModal, useStore } from '@context';
import { formatDate, formatObject } from '@utils';
import EditPen from '@assets/EditPen';
import TrashCan from '@assets/TrashCan';
import './BrewDetails.css'

function BrewDetails({ brew, setBrew }) {
    const { setOnModalClose, setModalContent } = useModal();
    const { fetchBrews } = useStore();

    // parsed grindSize and ratio (no trailing zeros)
    const pGrindSize = Number(brew.grindSize);
    const pRatio = Number(brew.ratio);
    const pDose = Number(brew.dose);
    const pWater = Number(brew.waterAmt);
    const pRating = Number(brew.rating)
    const pDate = formatDate(brew.date);

    const editBrew = () => {
        setModalContent(<BrewForm brewId={brew.id} />);
        setOnModalClose(() => () => {
            fetch(`/api/brews/${brew.id}`)
            .then(res => res.json())
            .then(data => formatObject(data))
            .then(data => setBrew(data))
        });
    }
    
    
    const openConfirmDelete = () => {
        const deleteBrew = () => {
            fetch(`/api/brews/${brew.id}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            ).then(res => {
                if(res.ok) fetchBrews();
            });
        }

        setModalContent(
            <DeleteModalWrap
            heading={'Are you sure you want to delete this brew?'}
            deleteFn={deleteBrew}
            />
        )
    }

    return (
        <div id="brew-details-modal">
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
                    <div className='content-box'>
                        <span>{brew.grinder}</span>
                    </div>
                    <div className='content-box'>
                        <div>
                            <span>{pDose}g coffee</span>
                            { brew.grindSize && <span className='secondary-details'>grind setting {pGrindSize}</span> }
                        </div>
                        <div>
                            <span>{pWater}g water</span>
                            { brew.waterTemp && <span className='secondary-details'>{brew.waterTemp}&deg;{brew.celsius ? "C" : "F"}</span> }
                        </div>
                        <div>
                            <span>1/{pRatio} ratio</span>
                        </div>
                    </div>
                    <div className='content-box'>
                        <p>Recipe:&#10;{brew.recipe}</p>
                    </div>
                    <div className='content-box'>
                        <p>Notes:&#10;{brew.notes}</p>
                    </div>
            </div>

            <div className='brew-buttons'>
                <button className='edit-brew-button' onClick={editBrew}>
                    <EditPen />
                </button>
                <button className='delete-brew-button' onClick={openConfirmDelete}>
                    <TrashCan />
                </button>
            </div>
        </div>
    )
}

export default BrewDetails;