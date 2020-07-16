import React from 'react';
import Modal from 'react-modal';
import './ErrorModal.scss';

const ErrorModal=({showErrorModal,setShowErrorModal})=>{
    return(
        <Modal
            className="modal-error"
            isOpen={showErrorModal}
            contentLabel="Example Modal"
            onRequestClose={()=>setShowErrorModal(false)}
            closeTimeoutMS={100}
        >
            <h1 className="modal-error__title">Error!</h1>
            <p className="modal-error__content">Cannot Find path to the goal</p>
            <button
                onClick={()=>setShowErrorModal(false)}
                className="modal-error__close"
                type="button"
            >
                X
            </button>
        </Modal>
    );
};

export default ErrorModal;