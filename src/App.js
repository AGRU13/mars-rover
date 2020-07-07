import React, {useState, useRef} from 'react';
import './App.scss';
import Navbar from './Components/Navbar';
import SecondNavbar from './Components/SecondNavbar';
import DescriptionBar from './Components/Descriptionbar';
import GridLayout from './Components/Gridlayout';
import BFS from './Algorithms/BFS';
import DFS from './Algorithms/DFS';
import A_start from './Algorithms/A_star';

function App() {
    const [start,setStart]=useState([9,15]);
    const [end,setEnd]=useState([9,45]);
    const [grid,setGrid]=useState(Array(20).fill().map(()=>Array(60).fill(0)));
    const [visualize,setVisualize]=useState(false);
    const [turnOff,setTurnOff]=useState(false);
    const [algorithmType,setAlgorithmType]=useState("BFS");

    const toggleWall=(y,x,type)=>{
        if(type===1){
            let temp=[...grid];
            temp[y][x]=1;
            setGrid(temp);
        }else{
            let temp=[...grid];
            temp[y][x]=0;
            setGrid(temp);
        }
    }

    const showPath=async(parent)=>{
        let previous=end;
        grid[previous[0]][previous[1]]=2;
        let list=[];
        list.push(previous);
        while(previous[0]!==start[0]||previous[1]!==start[1]){
            previous=parent[previous[0]][previous[1]];
            list.unshift(previous);
            grid[previous[0]][previous[1]]=2;
        }
        for(let i=0;i<list.length;i++){
            await new Promise((done) => setTimeout(() => done(), 50)); //To slow down the animation
            if(i===0){
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__start__path`;
            }else if(i===list.length-1){
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__end__path`;
            }else{
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className=`grid-cells__path`;
            }
        }
        setVisualize(false);
    }

    const clearPath=()=>{
        let temp=[...grid];
        for(let i=0;i<20;i++){
            for(let j=0;j<60;j++)
                if(temp[i][j]===2||temp[i][j]===3) temp[i][j]=0;
        }   
        setTurnOff(false);
        setGrid(temp);
    }

    const clearWalls=()=>{
        let newGrid=[...grid];
        for(let i=0;i<20;i++){
            for(let j=0;j<60;j++)
                if(newGrid[i][j]===1) newGrid[i][j]=0;
        }
        setGrid(newGrid);
    }

    const showVisited=(visitedNodesInOrder,parent)=>{
        for(let i=0;i<=visitedNodesInOrder.length;i++){
            if(i===visitedNodesInOrder.length){
                setTimeout(()=>{
                    showPath(parent);
                },10*i);
                return ;
            }
            const node=visitedNodesInOrder[i];
            if((node[0]!=end[0]||node[1]!=end[1])&&(node[0]!=start[0]||node[1]!=start[1])){
                setTimeout(()=>{
                    grid[node[0]][node[1]]=3
                    document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells__visited`;
                },10*i);
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
        showVisited(visitedNodesInOrder,parent);
    }

    return (
        <React.Fragment>
          <Navbar 
              setVisualize={setVisualize} 
              turnOff={turnOff}
              setAlgorithmType={setAlgorithmType}
              clearWalls={clearWalls}
              setTurnOff={setTurnOff}
              clearPath={clearPath}
              visualize={visualize}
          />
        <SecondNavbar/>
        <DescriptionBar algorithmType={algorithmType}/>
        <GridLayout start={start} end={end} grid={grid} toggleWall={toggleWall}/>
        </React.Fragment>
    );
}

export default App;