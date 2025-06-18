import { useModal } from '@context';
import './DeleteCoffee.css';

function DeleteCoffee({ deleteFn }) {
    const { closeModal } = useModal();

    const deleteCoffee = () => {
        deleteFn();
        closeModal();
    }

    return (
        <div className="delete-modal delete-coffee">
            <h6>Are you sure you want to delete this coffee and <em><u>all of it's associated brews</u></em>?</h6>
            <div className='modal-buttons'>
                <button className='cancel' onClick={closeModal}>Cancel</button>
                <button className='delete' onClick={deleteCoffee}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteCoffee;