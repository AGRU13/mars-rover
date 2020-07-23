import React from 'react';
import Modal from 'react-modal';
import './TutorialModal.scss';

const tutorialModal=({showTutorialModal,setShowTutorialModel})=>{
    return(
        <Modal
            className="tutorial-modal"
            isOpen={showTutorialModal}
            contentLabel="Example Modal"
            onRequestClose={()=>setShowTutorialModel(false)}
        >
            <p className="tutorial-modal__usage">
                <div className="tutorial-modal__row">
                    <h2>1.You can select an pathfinding Algorithm to visualize from the first drop-down menu, some only works on unweighted graphs and some on weighted as well as unweighted.</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>2.You can select an Algorithm to generate a maze automatically from the second drop-down menu from the left.</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>3.You can choose either to add walls or weights from the third drop-down menu.These can be added by either clicking a cell or by dragging over multiple cells </h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>4.Normal cells have cost of 1, weighted cells have cost of 10, weighted cells can be compared with high traffic areas, and walls are impenetrable.</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>5.Just above the grid you can read the information about the currently selected pathfinding algorithm.</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>6.The position of start and end node could be change by clicking and than dragging them.</h2>
                </div>
            </p>
            <button onClick={()=>setShowTutorialModel(false)} className="tutorial-modal__close" type="button">
                X
            </button>
        </Modal>
        
    );
};

export default tutorialModal;