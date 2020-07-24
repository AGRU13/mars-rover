import React, {useState} from 'react';
import './App.scss';
import Modal from 'react-modal'; 
import { FaGithub } from 'react-icons/fa'; //github icon
import Navbar from './Components/Navbar';
import SecondNavbar from './Components/SecondNavbar';
import DescriptionBar from './Components/Descriptionbar';
import GridLayout from './Components/Gridlayout';
import ErrorModal from './Components/ErrorModal.js';
import TutorialModal from './Components/TutorialModal';
import BFS from './Algorithms/BFS';
import DFS from './Algorithms/DFS';
import A_star from './Algorithms/A_star';
import Dijkstra from './Algorithms/Dijkstra';
import BestFirstSearch from './Algorithms/BestFirstSearch';

Modal.setAppElement('#root');

function App() {
    const [start,setStart]=useState([9,15]);
    const [end,setEnd]=useState([9,45]);
    const [grid,setGrid]=useState(Array(20).fill().map(()=>Array(60).fill(0)));
    const [visualize,setVisualize]=useState(false);
    const [turnOff,setTurnOff]=useState(false);
    const [algorithmType,setAlgorithmType]=useState("A*");
    const [mazeType,setMazeType]=useState("none");
    const [wallsOrWeights,setWallsOrWeights]=useState("wall");
    const [showErrorModal,setShowErrorModal]=useState(false);
    const [showTutorialModal,setShowTutorialModel]=useState(false);
    const [exploredNodes,setExploredNodes]=useState(0);
    const [timeTaken,setTimeTaken]=useState(0);
    const [pathLength,setPathlength]=useState(0);

    const toggleWall=(x,y,type)=>{
        if(type===1){
            let temp=[...grid];
            if(wallsOrWeights==="wall")
                temp[x][y]=1;
            else temp[x][y]=4;
            setGrid(temp);
        }else{
            let temp=[...grid];
            temp[x][y]=0;
            setGrid(temp);
        }
    }

    const showPath=async(parent)=>{
        let previous=end;
        grid[previous[0]][previous[1]]=2;
        let list=[];
        list.push(previous);
        let distance=1;
        while(previous[0]!==start[0]||previous[1]!==start[1]){
            previous=parent[previous[0]][previous[1]];
            list.unshift(previous);
            if(grid[previous[0]][previous[1]]===5) {
                grid[previous[0]][previous[1]]=6;
                distance+=10;
            }
            else {
                grid[previous[0]][previous[1]]=2;
                distance+=1;
            }
        }
        for(let i=0;i<list.length;i++){
            await new Promise((done) => setTimeout(() => done(), 50)); //To slow down the animation
            if(i===0){
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className="grid-cells__start__path";
            }else if(i===list.length-1){
                document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className="grid-cells__end__path";
            }else{
                if(grid[list[i][0]][list[i][1]]===6) document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className="grid-cells__weights__path";
                else document.getElementById(`node-${list[i][0]}-${list[i][1]}`).className="grid-cells__path";
            }
        }
        setPathlength(distance);
        setVisualize(false);
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

    const visualizeAlgorithm=()=>{
        let visitedNodesInOrder=[];
        let parent=Array(20).fill().map(()=>Array(60).fill([-1,-1]));
        let t0=null,t1=null;
        if(algorithmType==="BFS"){
            t0=performance.now();
            BFS(start,end,grid,visitedNodesInOrder,parent);
            t1=performance.now();
        }
        else if(algorithmType==="DFS"){
            t0=performance.now();
            DFS(start,end,grid,visitedNodesInOrder,parent);
            t1=performance.now();
        }
        else if(algorithmType==="A*"){
            t0=performance.now();
            A_star(start,end,grid,visitedNodesInOrder,parent);
            t1=performance.now();
        }
        else if(algorithmType==="DIJKSTRA"){
            t0=performance.now();
            Dijkstra(start,end,grid,visitedNodesInOrder,parent);
            t1=performance.now();
        }
        else if(algorithmType==="GREEDY"){
            t0=performance.now();
            BestFirstSearch(start,end,grid,visitedNodesInOrder,parent);
            t1=performance.now();
        }
        setExploredNodes(visitedNodesInOrder.length);
        setTimeTaken(t1-t0);
        // console.log(visitedNodesInOrder);
        if(parent[end[0]][end[1]][0]===-1) {
            setTurnOff(false);
            setVisualize(false);
            setShowErrorModal(true);
        }
        else showVisited(visitedNodesInOrder,parent);
    }

    return (
        <React.Fragment>
            <ErrorModal showErrorModal={showErrorModal} setShowErrorModal={setShowErrorModal} />
            <TutorialModal showTutorialModal={showTutorialModal} setShowTutorialModel={setShowTutorialModel}/>
            <Navbar 
                setVisualize={setVisualize} 
                turnOff={turnOff}
                setAlgorithmType={setAlgorithmType}
                visualizeAlgorithm={visualizeAlgorithm}
                clearGrid={clearGrid}
                setTurnOff={setTurnOff}
                clearPath={clearPath}
                visualize={visualize}
                grid={grid}
                start={start}
                end={end}
                mazeType={mazeType}
                setMazeType={setMazeType}
                fillWalls={fillWalls}
                setWallsOrWeights={setWallsOrWeights}
                setShowTutorialModel={setShowTutorialModel}
            />
            <SecondNavbar/>
            <DescriptionBar 
                algorithmType={algorithmType}
                turnOff={turnOff} 
                visualize={visualize}
                exploredNodes={exploredNodes}
                timeTaken={timeTaken}
                pathLength={pathLength}
                mazeType={mazeType}
            />
            <GridLayout 
                start={start} 
                end={end} 
                grid={grid} 
                toggleWall={toggleWall} 
                turnOff={turnOff}
                setStart={setStart}
                setEnd={setEnd}
            />
            <footer className="footer">
                <p className="footer__author">PATHFINDING VISUALIZER - Made by Ayush Agrawal</p>
                <a  
                    href="https://github.com/AGRU13/mars-rover"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="footer__github" />
                </a>
            </footer>
        </React.Fragment>
    );
}

export default App;