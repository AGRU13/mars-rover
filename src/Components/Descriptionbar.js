import React from 'react';
import './Descriptionbar.scss';

const DescriptionBar=({algorithmType,turnOff,visualize,exploredNodes,timeTaken,pathLength})=>{
    let description=null;
    if(algorithmType==="BFS"){
        description="Breadth First Search gives the shortest path for the unweighted graph.";
    }else if(algorithmType==="DFS"){
        description="Depth Frist Search does not gurantee the shortest path."
    }else if(algorithmType==="A*"){
        description="A* gives the shortest path,with a consistent heuristic A* does the fewest number of necessary expansions."
    }else if(algorithmType==="DIJKSTRA"){
        description="Dijkstra is one of the most used weighted graph algorithm which gives the shortest path"
    }
    return(
        <React.Fragment>
        <div className="description">
            {description}
        </div>
        <pre className="performance">
            {!visualize&&turnOff?"No of explored nodes = "+`${exploredNodes},`:null}
            {!visualize&&turnOff?"   Time Taken = "+`${timeTaken} milliseconds,`:null}
            {!visualize&&turnOff?"   Shortest Path Length/Cost = "+`${pathLength}`:null}
        </pre>
        </React.Fragment>
    )
};

export default DescriptionBar;