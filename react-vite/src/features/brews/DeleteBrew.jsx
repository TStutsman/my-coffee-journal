import { useModal } from '@context';
import './DeleteBrew.css';

function DeleteBrew({ deleteFn }) {
    const { closeModal } = useModal();

    const deleteBrew = () => {
        deleteFn();
        closeModal();
    }

    return (
        <div className="delete-modal delete-brew">
            <h6>Are you sure you want to delete this brew?</h6>
            <div className='modal-buttons'>
                <button className='cancel' onClick={closeModal}>Cancel</button>
                <button className='delete' onClick={deleteBrew}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteBrew;