import { CoffeeForm, DeleteCoffee } from '@components';
import { useModal, useStore } from '@context';
import { useEffect, useState } from 'react';
import './CoffeeListItem.css';

function CoffeeListItem({ coffee: initialCoffee, show, focusCoffee }){
    const { setModalContent, setOnModalClose } = useModal();
    const { fetchCoffees } = useStore();

    // this slice of state allows the item to update its own values (i.e. after an edit)
    const [coffee, setCoffee] = useState(initialCoffee);
    const [itemClass, setItemClass] = useState("coffee-list-item");

    useEffect(() => {
        if(show) {
            setItemClass("coffee-list-item show-item");
        } else {
            setItemClass("coffee-list-item");
        }
    }, [show]);

    const editCoffee = () => {
        setModalContent(<CoffeeForm coffeeId={coffee.id} />);
        setOnModalClose(() => () => fetch(`/api/coffees/${coffee.id}`).then(res => res.json()).then(data => setCoffee(data)));
    }
    
    const deleteCoffee = () => {
        fetch(`/api/coffees/${coffee.id}`,
            {
                method: 'DELETE'
            }
        ).then(res => {
            // refresh coffee list context
            if(res.ok) fetchCoffees();
        });
    }
    
    const openConfirmDelete = () => {
        setModalContent(<DeleteCoffee deleteFn={deleteCoffee} />)
    }

    const showItem = () => focusCoffee();

    return (
        <div className={itemClass} style={{backgroundColor: coffee.color}} onTouchStart={showItem} onMouseOver={showItem}>
            <div className='coffee-title'>
                <h3>{coffee.roaster}</h3>
                <div>{coffee.farm}</div>
            </div>
            <div className='coffee-content'>
                <p>{coffee.region ? coffee.region + ', ' : ""}{coffee.country}</p>
                {coffee.varietal && <p>{coffee.varietal}</p>}
                <p>{coffee.process} Process</p>
                <p>{coffee.roast_profile} Roast</p>
            </div>

            <div className='coffee-buttons'>
                <button className='edit-coffee-button' onClick={editCoffee}>
                    <svg className='edit-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='currentColor'>
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                    </svg>
                </button>
                <button className='delete-coffee-button' onClick={openConfirmDelete}>
                    <svg className='trash-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='currentColor'>
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CoffeeListItem;