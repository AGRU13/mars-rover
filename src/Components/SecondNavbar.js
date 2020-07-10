import React from 'react';
import './SecondNavbar.scss';
import StartIcon from './../assets/StartIcon.svg';
import EndIcon from './../assets/EndIcon.svg';
import FinalPath from './../assets/Red.png';
import VisitedNodes from './../assets/Blue.png';
import Walls from './../assets/Black.png';

const SecondNavbar=()=>{
    return(
        <nav className="bottom-nav">
            <ul className="bottom-nav__ul">
                <li>
                    <img className="nav-image" src={StartIcon} alt="->"/> 
                    <div className="nav-content">Source</div>
                </li>
                <li>
                    <img className="nav-image" src={EndIcon} alt="x"/> 
                    <div className="nav-content">Destination</div>
                </li>
                <li>
                    <img className="nav-image" src={FinalPath} alt="red"/> 
                    <div className="nav-content">Final Path</div>
                </li>
                <li>
                    <img className="nav-image" src={VisitedNodes} alt="cyan"/> 
                    <div className="nav-content">Visited Cells</div>
                </li>
                <li> 
                    <div className="weights">W</div>
                    <div className="nav-content">Weights</div>
                </li>
                <li>
                    <img className="nav-image" src={Walls} alt="cyan"/> 
                    <div className="nav-content">Walls</div>
                </li>
            </ul>
        </nav>
    );
}

export default SecondNavbar;