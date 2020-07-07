import React from 'react';
import './Navbar.scss';
 

const navbar=({setVisualize,turnOff,setAlgorithmType,clearWalls,setTurnOff,clearPath,visualize})=>{

    const onAlgoChange=(e)=>{
        setAlgorithmType(e.target.value);
    }

    const onVisualize=()=>{
        setVisualize(true);
        setTurnOff(true);
    }

    return (
        <nav className="content-header">
            <select
                className="content-header__select"
                onChange={onAlgoChange}
                id="algorithm"
                disabled={turnOff}
            >
                <option value="BFS" defaultChecked> BFS </option>
                <option value="DFS"> DFS </option>
                <option value="A*"> A* </option>
            </select>
            <select
                className="content-header__select"
                // onChange={onAlgoChange}
                disabled={turnOff}
            >
                <option value="B" defaultChecked> None </option>
                {/* <option value="DFS"> DFS </option>
                <option value="A*"> A* </option> */}
            </select>
            <button
                className="content-header__button"
                onClick={onVisualize}
                disabled={turnOff}
                type="button"
            > 
                Visualize!
            </button>
            <button 
                className="content-header__button"
                onClick={clearWalls}
                disabled={turnOff}
                type="button"
            >
                Clear Walls
            </button>
            <button
                className="content-header__button"
                onClick={clearPath}
                disabled={visualize}
                type="button"
            >
                Clear Path
            </button>
        </nav>
    );
}

export default navbar;