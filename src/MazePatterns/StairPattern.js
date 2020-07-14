const stairPattern=async(start,end,grid,setGrid,setTurnOff,setMazeType)=>{
    let x=19;
    let y=0;
    let newGrid=[...grid];
    while(x>0&&y<60){
        if((x===start[0]&&y===start[1])||(x===end[0]&&y===end[1])) continue;
        await new Promise((done) => setTimeout(() => done(),10)); //To slow down the animation
        newGrid[x][y]=1;
        document.getElementById(`node-${x}-${y}`).className=`grid-cells__walls`;
        x--;
        y++;
    }
    while(x<18&&y<60){
        if((x===start[0]&&y===start[1])||(x===end[0]&&y===end[1])) continue;
        await new Promise((done) => setTimeout(() => done(),10)); //To slow down the animation
        newGrid[x][y]=1;
        document.getElementById(`node-${x}-${y}`).className=`grid-cells__walls`;
        x++;
        y++;
    }
    while(x>0&&y<59){
        if((x===start[0]&&y===start[1])||(x===end[0]&&y===end[1])) continue;
        await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
        newGrid[x][y]=1;
        document.getElementById(`node-${x}-${y}`).className=`grid-cells__walls`;
        x--;
        y++;
    }
    return ;
}

export default stairPattern;