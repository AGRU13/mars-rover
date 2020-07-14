import React, {useState} from 'react';
import './App.scss';
import Navbar from './Components/Navbar';
import SecondNavbar from './Components/SecondNavbar';
import DescriptionBar from './Components/Descriptionbar';
import GridLayout from './Components/Gridlayout';
import BFS from './Algorithms/BFS';
import DFS from './Algorithms/DFS';
import A_start from './Algorithms/A_star';
import Dijkstra from './Algorithms/Dijkstra';
import BestFirstSearch from './Algorithms/BestFirstSearch';

function App() {
    const [start,setStart]=useState([9,15]);
    const [end,setEnd]=useState([9,45]);
    const [grid,setGrid]=useState(Array(20).fill().map(()=>Array(60).fill(0)));
    const [visualize,setVisualize]=useState(false);
    const [turnOff,setTurnOff]=useState(false);
    const [algorithmType,setAlgorithmType]=useState("A*");
    const [mazeType,setMazeType]=useState("none");
    const [wallsOrWeights,setWallsOrWeights]=useState("wall");

    const toggleWall=(y,x,type)=>{
        if(type===1){
            let temp=[...grid];
            if(wallsOrWeights==="wall")
                temp[y][x]=1;
            else temp[y][x]=4;
            setGrid(temp);
        }else{
            let temp=[...grid];
            temp[y][x]=0;
            setGrid(temp);
        }
    }

    const showPath=async(parent)=>{
        let previous=end;
        let newGrid=[...grid];
        newGrid[previous[0]][previous[1]]=2;
        let list=[];
        list.push(previous);
        while(previous[0]!==start[0]||previous[1]!==start[1]){
            previous=parent[previous[0]][previous[1]];
            list.unshift(previous);
            if(newGrid[previous[0]][previous[1]]===5) newGrid[previous[0]][previous[1]]=6;
            else newGrid[previous[0]][previous[1]]=2;
        }
        for(let i=0;i<list.length;i++){
            await new Promise((done) => setTimeout(() => done(), 50)); //To slow down the animation
            if(i===0){
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__start__path`;
            }else if(i===list.length-1){
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__end__path`;
            }else{
                if(newGrid[list[i][0]][list[i][1]]===6) document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__weights__path`;
                else document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__path`;
            }
        }
        setVisualize(false);
        setGrid(newGrid);
    }

    const clearPath=()=>{
        let temp=[...grid];
        for(let i=0;i<20;i++)
            for(let j=0;j<60;j++){
                if(temp[i][j]===5||temp[i][j]===6) temp[i][j]=4;
                else if(temp[i][j]===2||temp[i][j]===3) temp[i][j]=0;
            }
        setTurnOff(false);
        setGrid(temp);
    }

    const clearGrid=()=>{
        let newGrid=[...grid];
        for(let i=0;i<20;i++){
            for(let j=0;j<60;j++)
                if(newGrid[i][j]===1||newGrid[i][j]===4) newGrid[i][j]=0;
        }
        setGrid(newGrid);
    }

    const fillWalls=()=>{
        let newGrid=[...grid];
        for(let i=0;i<20;i++){
            for(let j=0;j<60;j++){
                if((i===start[0]&&j===start[1])||(i===end[0]&&j===end[1]))
                    continue;
                newGrid[i][j]=1;
            }
        }
        setGrid(newGrid);
    }

    const showVisited=(visitedNodesInOrder,parent)=>{
        for(let i=0;i<=visitedNodesInOrder.length;i++){
            if(i===visitedNodesInOrder.length){
                setTimeout(()=>{
                    showPath(parent);
                },15*i);
                return ;
            }
            const node=visitedNodesInOrder[i];
            if((node[0]!==end[0]||node[1]!==end[1])&&(node[0]!==start[0]||node[1]!==start[1])){
                if(grid[node[0]][node[1]]===4){
                    setTimeout(()=>{
                        grid[node[0]][node[1]]=5;
                        document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells__weights__visited`; 
                    },15*i);
                }
                else{
                    setTimeout(()=>{
                        grid[node[0]][node[1]]=3;
                        document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells__visited`;    
                    },15*i);
                }
            }
        }
    }

    if(visualize){
        let visitedNodesInOrder=[];
        let parent=Array(20).fill().map(()=>Array(60).fill([0,0]));
        if(algorithmType==="BFS")
            BFS(start,end,grid,visitedNodesInOrder,parent);
        else if(algorithmType==="DFS")
            DFS(start,end,grid,visitedNodesInOrder,parent);
        else if(algorithmType==="A*")
            A_start(start,end,grid,visitedNodesInOrder,parent);
        else if(algorithmType==="DIJKSTRA")
            Dijkstra(start,end,grid,visitedNodesInOrder,parent);
        else if(algorithmType==="GREEDY")
            BestFirstSearch(start,end,grid,visitedNodesInOrder,parent);
        showVisited(visitedNodesInOrder,parent);
    }

    return (
        <React.Fragment>
          <Navbar 
              setVisualize={setVisualize} 
              turnOff={turnOff}
              setAlgorithmType={setAlgorithmType}
              clearGrid={clearGrid}
              setTurnOff={setTurnOff}
              clearPath={clearPath}
              visualize={visualize}
              grid={grid}
              setGrid={setGrid}
              start={start}
              end={end}
              mazeType={mazeType}
              setMazeType={setMazeType}
              fillWalls={fillWalls}
              setWallsOrWeights={setWallsOrWeights}
          />
        <SecondNavbar/>
        <DescriptionBar algorithmType={algorithmType}/>
        <GridLayout start={start} end={end} grid={grid} toggleWall={toggleWall} turnOff={turnOff}/>
        </React.Fragment>
    );
}

export default App;