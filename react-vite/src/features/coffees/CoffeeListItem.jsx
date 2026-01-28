import { CoffeeForm } from '@coffees';
import DeleteModalWrap from '@components/DeleteModalWrap';
import { useModal, useStore } from '@context';
import { useState } from 'react';
import EditPen from '@assets/EditPen';
import TrashCan from '@assets/TrashCan';
import './CoffeeListItem.css';

function CoffeeListItem({ coffee: initialCoffee }){
    const { setModalContent, setOnModalClose } = useModal();
    const { fetchCoffees } = useStore();

    // this slice of state allows the item to update its own values (i.e. after an edit)
    const [coffee, setCoffee] = useState(initialCoffee);

    const editCoffee = () => {
        setModalContent(<CoffeeForm coffeeId={coffee.id} />);
        setOnModalClose(() => () => fetch(`/api/coffees/${coffee.id}`).then(res => res.json()).then(data => setCoffee(data)));
    }
    
    const openConfirmDelete = () => {
        const deleteCoffee = () => {
            fetch(`/api/coffees/${coffee.id}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            ).then(res => {
                // refresh coffee list context
                if(res.ok) fetchCoffees();
            });
        }

        setModalContent(
            <DeleteModalWrap
            heading={`Delete '${coffee.farm}' by ${coffee.roaster}?`}
            info={'This action will delete all brews of this coffee'}
            deleteFn={deleteCoffee}
            />
        )
    }

    return (
        <div className={`coffee-list-item ${coffee.color}`}>
            <div className='coffee-title' style={{borderColor: `var(--${coffee.color})`}}>
                <h4 style={{color: `var(--text-${coffee.color})`}}>{coffee.farm}</h4>
                <h4>{coffee.roaster}</h4>
            </div>
            <div className='coffee-content'>
                <p>{coffee.region ? coffee.region + ', ' : ""}{coffee.country}</p>
                {coffee.varietal && <p>{coffee.varietal}</p>}
                <p>{coffee.process} Process</p>
                <p>{coffee.roast_profile} Roast</p>
            </div>

            <div className='coffee-buttons'>
                <button className='edit-coffee-button' onClick={editCoffee}>
                    <EditPen />
                </button>
                <button className='delete-coffee-button' onClick={openConfirmDelete}>
                    <TrashCan />
                </button>
            </div>
        </div>
    );
}

export default CoffeeListItem;