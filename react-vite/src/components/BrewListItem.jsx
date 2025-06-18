import { BrewForm, StarRating } from '@components';
import { useModal, useStore } from '@context';
import { formatDate } from '@utils';
import { useState, useEffect } from 'react';
import './BrewListItem.css';

function BrewListItem({ brew:initialBrew, show, focusBrew }) {
    const [brew, setBrew] = useState(initialBrew);
    const [itemClass, setItemClass] = useState("brew-list-item");

    const { setOnModalClose, setModalContent } = useModal();
    const { fetchBrews } = useStore();
    
    // parsed grindSize and ratio (no trailing zeros)
    const pGrindSize = Number(brew.grind_size);
    const pRatio = Number(brew.ratio);
    const pDose = Number(brew.dose);
    const pWater = Number(brew.water_amt);
    const pDate = formatDate(brew.date);

    useEffect(() => {
            if(show) {
                setItemClass("brew-list-item show-item");
            } else {
                setItemClass("brew-list-item");
            }
        }, [show]);

    const editBrew = () => {
        setModalContent(<BrewForm brewId={brew.id} />);
        setOnModalClose(() => () => fetch(`/api/brews/${brew.id}`).then(res => res.json()).then(data => setBrew(data)))
    }

    const deleteBrew = () => {
        fetch(`/api/brews/${brew.id}`,
            {
                method: 'DELETE'
            }
        ).then(res => {
            if(res.ok) fetchBrews();
        });
    }

    const showItem = () => focusBrew();

    return (
        <div className={itemClass} onTouchStart={showItem} onMouseOver={showItem}>
            <div className='brew-title'>
                <div>
                    <h3>{brew.coffee.farm}</h3>
                    <h5>{brew.coffee.roaster}</h5>
                </div>
                <p>{pDate}</p>
            </div>
            <div className='brew-content'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='currentColor'>
                        <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                    </svg>
                    <span>{pGrindSize}</span> on a {brew.grinder}
                </div>
                <div>{brew.brewer}</div>
                <div>
                    <svg id='coffee-icon' height="100%" version="1.1" viewBox="0 0 180 180" width="100%" fill='currentColor'>
                        <path d="M158.722 17.901C157.021 16.6015 153.055 16.1149 151.614 18.323C149.048 22.2548 148.517 26.1074 136.161 46.7811C123.264 68.3594 110.876 76.8848 85.8335 99.1835C61.009 121.288 42.7409 161.079 44.4821 172.784C44.7239 174.409 46.8151 176.809 48.3598 177.344C78.7194 184.948 117.5 170.971 145.623 139.164C181.014 99.1389 186.381 45.8448 158.722 17.901ZM141.054 5.82212C109.689-7.74567 65.5925 5.70712 34.4812 40.8931C-2.02254 82.1779-6.76678 137.643 23.9209 164.777C24.8877 165.632 25.9516 166.312 26.9644 167.091C28.5568 167.902 29.9422 166.436 30.5861 164.943C32.1301 161.366 30.8514 159.892 42.1346 136.651C62.9019 93.8719 91.3721 82.5488 109.5 63.295C126.995 44.7146 131.13 35.1941 142.159 9.88744C142.536 9.02342 142.612 6.72356 141.054 5.82212Z" />
                    </svg>
                    <span>{pDose}g</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill='currentColor'>
                        <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>
                    <span>{pWater}g</span>
                    {
                        brew.water_temp && 
                        <span>{brew.water_temp}&deg;{brew.celsius ? "C" : "F"}</span>
                    }
                </div>
                <div>1:{pRatio} ratio</div>
                { 
                    (brew.recipe || brew.notes) &&
                    <div className='content-p'>
                    {
                        brew.recipe &&
                        <div className='recipe'>
                            <h6>Recipe</h6>
                            <p>{brew.recipe}</p>
                        </div>
                    }
                    {
                        brew.notes &&
                        <div className='notes'>
                            <h6>Notes</h6>
                            <p>{brew.notes}</p>
                        </div>
                    }
                    </div>
                }
                <div><StarRating rating={brew.rating} /></div>

            </div>
            <div className='brew-buttons'>
                <button className='edit-brew-button' onClick={editBrew}>
                    <svg className='edit-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='currentColor'>
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                    </svg>
                </button>
                <button className='delete-brew-button' onClick={deleteBrew}>
                    <svg className='trash-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='currentColor'>
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </button>
            </div>

        </div>
    );
}

export default BrewListItem