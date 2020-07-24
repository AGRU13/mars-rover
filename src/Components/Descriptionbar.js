import React from 'react';
import './Descriptionbar.scss';

const DescriptionBar=({algorithmType,turnOff,visualize,exploredNodes,timeTaken,pathLength,mazeType})=>{
    let description=null;
    if(algorithmType==="BFS"){
        description="Breadth First Search gives the shortest path for the unweighted graph.";
    }else if(algorithmType==="DFS"){
        description="Depth Frist Search works only on the unweighted graph and does not gurantee the shortest path."
    }else if(algorithmType==="A*"){
        description="A* gives the shortest path in both weighted and unweighted graphs, A* does the fewest number of necessary expansions."
    }else if(algorithmType==="DIJKSTRA"){
        description="Dijkstra is one of the most used graph algorithm which gives the shortest path in both weighted and unweighted graphs"
    }else if(algorithmType==="GREEDY"){
        description="Greedy best first search works on both the weighted and unweighted graphs but does not gurantee the shortest path"
    }
    
    return(
        <React.Fragment>
        <div className="description">
            {description}
        </div>
        <pre className="performance">
            {!visualize&&turnOff&&mazeType==="none"?"No of explored nodes = "+`${exploredNodes},`:null}
            {!visualize&&turnOff&&mazeType==="none"?"   Time Taken = "+`${timeTaken} milliseconds,`:null}
            {!visualize&&turnOff&&mazeType==="none"?"   Shortest Path Length/Cost = "+`${pathLength}`:null}
        </pre>
        </React.Fragment>
    )
};

export default DescriptionBar;