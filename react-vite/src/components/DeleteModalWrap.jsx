import { useModal } from '@context';
import './DeleteModalWrap.css';

function DeleteModalWrap({ heading, info, deleteFn }) {
    const { closeModal } = useModal();

    const handleDelete = () => {
        deleteFn();
        closeModal();
    }

    return (
        <div className="delete-modal delete-modal-wrap">
            <div>
                <h6>{heading}</h6>
                {info && <p>{info}</p>}
            </div>
            <div className='modal-buttons'>
                <button className='cancel' onClick={closeModal}>Cancel</button>
                <button className='delete' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteModalWrap;