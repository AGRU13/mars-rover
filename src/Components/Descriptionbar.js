import React from 'react';
import './Descriptionbar.scss';

const DescriptionBar=({algorithmType})=>{
    let description=null;
    if(algorithmType==="BFS"){
        description="Breadth First Search gives the shortest path for the unweighted graph.";
    }else if(algorithmType==="DFS"){
        description="Depth Frist Search does not gurantee the shortest path."
    }else if(algorithmType==="A*"){
        description="A* gives the shortest path,with a consistent heuristic A* does the fewest number of necessary expansions."
    }
    return(
        <div className="description">
            {description}
        </div>
    )
};

export default DescriptionBar;