import React from 'react';
import './Navbar.scss';
import DFSMaze from './../MazePatterns/DFSMaze';
import StairPattern from './../MazePatterns/StairPattern';
import BinaryTreeMaze from './../MazePatterns/BinaryTreeMaze';
import KruskalMaze from './../MazePatterns/KruskalMaze';
import RecursiveDivision from './../MazePatterns/RecursiveDivision';

const navbar=
({setVisualize,turnOff,setAlgorithmType,clearGrid,
    setTurnOff,clearPath,visualize,grid,setGrid,start,
    end,mazeType,setMazeType,fillWalls,setWallsOrWeights})=>{

    const onAlgoChange=(e)=>{
        setAlgorithmType(e.target.value);
    }

    const onVisualize=()=>{
        setVisualize(true);
        setTurnOff(true);
    }

    const showMaze=async(visitedNodesInOrder)=>{
        for(let i=0;i<=visitedNodesInOrder.length;i++){
            if(i===visitedNodesInOrder.length){
                await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
                setTurnOff(false);
                setMazeType("none");
                return ;
            }
            const node=visitedNodesInOrder[i];
            if((node[0]!==end[0]||node[1]!==end[1])&&(node[0]!==start[0]||node[1]!==start[1])){
                await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
                document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells`;
            }
        }
    }

    const onPatternChange=async(e)=>{
        if(e.target.value==="none") return;
        setTurnOff(true);
        setMazeType(e.target.value);
        if(e.target.value==="stair") {
            clearGrid();
            await StairPattern(start,end,grid);
            setTurnOff(false);
            setMazeType("none");
        }
        else if(e.target.value==="dfs_maze") {
            fillWalls();
            await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
            let visitedNodesInOrder=[];
            DFSMaze(start,end,grid,visitedNodesInOrder);
            showMaze(visitedNodesInOrder);
        }else if(e.target.value==="binary_maze"){
            fillWalls();
            await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
            let visitedNodesInOrder=[];
            BinaryTreeMaze(start,end,grid,visitedNodesInOrder);
            showMaze(visitedNodesInOrder);
        }else if(e.target.value==="kruskal_maze"){
            fillWalls();
            await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
            let visitedNodesInOrder=[];
            KruskalMaze(start,end,grid,visitedNodesInOrder);
            showMaze(visitedNodesInOrder);
        }else if(e.target.value==="recursive"){
            clearGrid();
            await RecursiveDivision(start,end,grid);
            setTurnOff(false);
            setMazeType("none");
        }
    }

    const onWallChange=(e)=>{
        setWallsOrWeights(e.target.value);
    }

    return (
        <nav className="content-header">
            <select
                className="content-header__select"
                onChange={onAlgoChange}
                id="algorithm"
                disabled={turnOff}
                style={{width:"120px"}}
            >
                <option value="A*" defaultChecked> A* </option>
                <option value="BFS" > BFS </option>
                <option value="DFS"> DFS </option>
                <option value="DIJKSTRA"> Dijkstra</option>
                <option value="GREEDY">Greedy Best First Search</option>
            </select>
            <select
                className="content-header__select"
                // onChange={onPatternChange}
                disabled={turnOff}
                style={{width:"200px"}}
            >
                <option value="none" defaultChecked>None</option>
                <option value="stair" onClick={onPatternChange}>Simple Stair Pattern</option>
                <option value="dfs_maze" onClick={onPatternChange}>DFS Maze</option>
                <option value="binary_maze" onClick={onPatternChange}>Binary Tree Maze</option>
                <option value="kruskal_maze" onClick={onPatternChange}>Kruskal Maze</option>
                <option value="recursive" onClick={onPatternChange}>Recursive Division</option>
            </select>
            <select
                className="content-header__select"
                disabled={turnOff}
                style={{width:"120px"}}
                onChange={onWallChange}
            >
                <option value="wall" defaultChecked>Walls</option>
                <option value="weight">Weights</option>
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
                onClick={clearGrid}
                disabled={turnOff}
                type="button"
            >
                Clear Grid
            </button>
            <button
                className="content-header__button"
                onClick={clearPath}
                disabled={visualize||mazeType!=="none"}
                type="button"
            >
                Clear Path
            </button>
        </nav>
    );
}

export default navbar;