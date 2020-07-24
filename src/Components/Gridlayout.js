import React, { useState } from 'react';
import './Gridlayout.scss';

const GridLayout=({start,end,grid,toggleWall,turnOff,setStart,setEnd})=>{

    const [clicking,setClicking]=useState(false);
    const [dragging,setDragging]=useState({begin:false,end:false});

    const onMouseDown=(e)=>{
        const splitId=e.target.id.split("-");
        const ridx=Number(splitId[1]);  // get the row number from the element id
        const cidx=Number(splitId[2]);  // fet the column number from the element id
        if(ridx===start[0]&&cidx===start[1]){
            setDragging({begin:true,end:false});
        }else if(ridx===end[0]&&cidx===end[1]){
            setDragging({begin:false,end:true});
        }else{
            setClicking(true);
        }
    }

    const onMouseUp=()=>{
        setClicking(false);
        setDragging({begin:false,end:false});
    }

    const onMouseMove=(e)=>{
        if(turnOff) return;
        const splitId=e.target.id.split("-");
        const ridx=Number(splitId[1]); // get the row number from the element id
        const cidx=Number(splitId[2]); // fet the column number from the element id
        if(dragging.begin||dragging.end){
            if(e.target.className!=="grid-cells") return; 
            const next=[ridx,cidx];
            if(dragging.begin) setStart(next);
            else setEnd(next);
        }else{
            if(!clicking) return;
            if(e.target.className==="grid-cells__walls"||e.target.className=="grid-cells__weights") toggleWall(ridx,cidx,0)
            else if(e.target.className==="grid-cells") toggleWall(ridx,cidx,1) 
        }
    }

    const onClick=(e)=>{
        if(turnOff) return;
        const splitId=e.target.id.split("-");
        const ridx=Number(splitId[1]);  // fet the column number from the element id
        const cidx=Number(splitId[2]);  // fet the column number from the element id
        if(e.target.className==="grid-cells__walls"||e.target.className=="grid-cells__weights") toggleWall(ridx,cidx,0)
        else if(e.target.className==="grid-cells") toggleWall(ridx,cidx,1) 
    }

    let List=[];
    for(let i=0;i<20;i++){
        let temp=[];
        for(let j=0;j<60;j++){

            // if the cell is a start cell
            if(i===start[0]&&j===start[1]){

                // of the start node belongs to the final path
                if(grid[i][j]===2){
                    temp.push(
                        <div className="grid-cells__start__path" id={`node-${i}-${j}`} key={`${i}${j}`} >
                        </div>
                    )
                }else{
                temp.push(
                    <div className="grid-cells__start" id={`node-${i}-${j}`} key={`${i}${j}`}>
                    </div>
                    )
                }
            }else if(i===end[0]&&j===end[1]){   // if the cell is end cell

                if(grid[i][j]===2){
                    // if the cell belongs to the final path
                    temp.push(
                        <div className="grid-cells__end__path" id={`node-${i}-${j}`} key={`${i}${j}`}>
                        </div>
                    )    
                }else{
                temp.push(
                    <div className="grid-cells__end" id={`node-${i}-${j}`} key={`${i}${j}`}>
                    </div>
                    )
                }
            }else if(grid[i][j]===0){       // if the cell is empty i.e a normal cell
                temp.push(
                    <div className="grid-cells"
                        key={`${i}${j}`}
                        id={`node-${i}-${j}`}>
                    </div>
                )
            }else if(grid[i][j]===1) {      // if the cell is a wall
                temp.push(
                    <div className="grid-cells__walls" 
                    key={`${i}${j}`}
                    id={`node-${i}-${j}`}>
                    </div>
                )
            }else if(grid[i][j]===2){       // if the cell belong to the final path
                temp.push(
                    <div className="grid-cells__path" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    </div>
                )
            }else if(grid[i][j]===3){      // If the cell is visited by the pathfinding algorithm
                temp.push(
                    <div className="grid-cells__visited" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    </div>
                )
            }else if(grid[i][j]===4){       // if the cell is weight
                temp.push(
                    <div className="grid-cells__weights" 
                    key={`${i}${j}`}
                    id={`node-${i}-${j}`}>
                        w
                    </div>
                )
            }else if(grid[i][j]===5){       //If the cell is weighted and visited by the pathfinging algorithm
                temp.push(
                    <div className="grid-cells__weights__visited" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    w</div>
                )
            }else{
                temp.push(                 //if the cell is weighted and belongs to the final path
                    <div className="grid-cells__weights__path" key={`${i}${j}`} id={`node-${i}-${j}`}> 
                    w</div>
                )
            }
        }
        List.push(temp);
    }

    return (
        <div style={{marginTop: "10px"}}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            tabIndex="0"
            role="button"
            onClick={onClick}
        >
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