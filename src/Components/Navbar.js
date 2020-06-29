import React,{useState} from 'react';
import './Navbar.scss';
const items = [
   {id: 1, value: 'DFS'},
   {id: 2, value: 'BFS'},
   {id: 3, value: 'A*'}
  ];
  
const DropDown=({title})=>{
    const [open,setOpen]=useState(false);
    return (
        <div className="dd-wrapper">
            <div className="dd-wrapper__title">{title}</div>
            {open&&(
            <ul className="dd-wrapper__ul">
                <li><button className="dd-content"><span>DFS</span></button></li> 
                <li><button className="dd-content"><span>DFS</span></button></li> 
                <li><button className="dd-content"><span>DFS</span></button></li> 
            </ul>
            )}
        </div>
    );
}

const navbar=()=>{
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="dropdown-li"><DropDown title="Algorithm"/></li>
                <li className="navbar-nav__li"><button>Mazes</button></li>
                <li className="navbar-nav__li"><button>Visualize</button></li>
                <li className="navbar-nav__li"><button>Reset Grid</button></li>
                <li className="navbar-nav__li"><button>Clear Path</button></li>
                <li className="navbar-nav__li"><button>Clear Walls</button></li>
            </ul>
        </nav>
    );
}

export default navbar;