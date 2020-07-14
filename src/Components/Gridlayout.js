import React from 'react';
import './Gridlayout.scss';

const GridLayout=({start,end,grid,toggleWall,turnOff})=>{
    let List=[];
    for(let i=0;i<20;i++){
        let temp=[];
        for(let j=0;j<60;j++){
            if(i===start[0]&&j===start[1]){
                if(grid[i][j]===2){
                    temp.push(
                        <div className="grid-cells__start__path" id={`node-${i}-${j}`} key={`${i}${j}`} >
                            {/* <img className="grid-cells__img" src={StartIcon} alt="->"/> */}
                        </div>
                    )
                }else{
                temp.push(
                    <div className="grid-cells__start" id={`node-${i}-${j}`} key={`${i}${j}`}>
                        {/* <img className="grid-cells__img" src={StartIcon} alt="->"/> */}
                    </div>
                    )
                }
            }else if(i===end[0]&&j===end[1]){
                if(grid[i][j]===2){
                    temp.push(
                        <div className="grid-cells__end__path" id={`node-${i}-${j}`} key={`${i}${j}`}>
                            {/* <img className="grid-cells__img" src={EndIcon} alt="x"/> */}
                        </div>
                    )    
                }else{
                temp.push(
                    <div className="grid-cells__end" id={`node-${i}-${j}`} key={`${i}${j}`}>
                        {/* <img className="grid-cells__img" src={EndIcon} alt="x"/> */}
                    </div>
                    )
                }
            }else if(grid[i][j]===0){
                temp.push(
                    <div className="grid-cells"
                        onMouseEnter={(e)=>{
                            if(!turnOff&&window.event.buttons===1)
                                toggleWall(i,j,1);}
                        }
                        onClick={(e)=>{
                            if(!turnOff)
                                toggleWall(i,j,1);}
                        }
                        key={`${i}${j}`}
                        id={`node-${i}-${j}`}>
                    </div>
                )
            }else if(grid[i][j]===1) {
                temp.push(
                    <div className="grid-cells__walls" 
                    onMouseEnter={(e)=>{
                        if(!turnOff&&window.event.buttons===1)
                            toggleWall(i,j,0);}
                    }
                    onClick={(e)=>{
                        if(!turnOff)
                            toggleWall(i,j,0)}
                    }
                    key={`${i}${j}`}
                    id={`node-${i}-${j}`}>
                    </div>
                )
            }else if(grid[i][j]===2){
                temp.push(
                    <div className="grid-cells__path" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    </div>
                )
            }else if(grid[i][j]===3){
                temp.push(
                    <div className="grid-cells__visited" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    </div>
                )
            }else if(grid[i][j]===4){
                temp.push(
                    <div className="grid-cells__weights" 
                    onMouseEnter={(e)=>{
                        if(!turnOff&&window.event.buttons===1)
                            toggleWall(i,j,0);}
                    }
                    onClick={(e)=>{
                        if(!turnOff)
                            toggleWall(i,j,0)}
                    }
                    key={`${i}${j}`}
                    id={`node-${i}-${j}`}>
                        w
                    </div>
                )
            }else if(grid[i][j]===5){
                temp.push(
                    <div className="grid-cells__weights__visited" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    w</div>
                )
            }else{
                temp.push(
                    <div className="grid-cells__weights__path" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    w</div>
                )
            }
        }
        List.push(temp);
    }

    return (
        <div style={{marginTop: "10px"}}>
            {List.map( (obj,idx)=>{
                    return (
                        <div className="grid-rows" key={idx}>
                            {obj}
                        </div>
                    );
                })}
        </div>
    );
}

export default GridLayout