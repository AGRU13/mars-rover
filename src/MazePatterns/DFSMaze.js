function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const DFSMaze=(start,end,grid,list)=>{
    let stack=[];
    stack.push(start);
    let dir=[1,2,3,4];
    let newGrid=[...grid];
    // for(let i=0;i<20;i++)
    //     for(let j=0;j<60;j++) newGrid[i][j]=grid[i][j];
        // console.log(newGrid);
    while(stack.length){
        shuffleArray(dir);
        if(stack.length>2000) break;
        let current=stack.pop();
        // if((current[0]!==start[0]||current[1]!==start[1])&&(current[0]!==end[0]||current[1]!==end[1])){
        //     newGrid[current[0]][current[1]]=0;
        // }
        for(let i=0;i<=3;i++){
            switch(dir[i]){
                case 1:
                    if(current[0]-2<0) continue;
                    if(grid[current[0]-2][current[1]]!==0){
                        list.push([[current[0]-2],current[1]]);
                        list.push([[current[0]-1],current[1]]);
                        // document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells`;
                        // document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells`;
                        stack.push([current[0]-2,current[1]]);
                        newGrid[current[0]-2][current[1]]=0;
                        newGrid[current[0]-1][current[1]]=0;
                    }
                    if(current[0]-2===end[0]&&current[1]===end[1]){
                        list.push([current[0]-1,current[1]]);
                        stack.push([current[0]-2,current[1]]);
                        newGrid[current[0]-1][current[1]]=0;
                    }
                    break;
                case 2:
                    if(current[1]-2<0) continue;
                    if(grid[current[0]][current[1]-2]!==0){
                        list.push([current[0],current[1]-2]);
                        list.push([current[0],current[1]-1]);
                        stack.push([current[0],current[1]-2]);
                        newGrid[current[0]][current[1]-2]=0;
                        newGrid[current[0]][current[1]-1]=0;
                    }
                    if(current[0]===end[0]&&current[1]-2===end[1]){
                        list.push([current[0],current[1]-1]);
                        stack.push([current[0],current[1]-2]);
                        newGrid[current[0]][current[1]-1]=0;
                    }
                    break;
                case 3:
                    if(current[0]+2>=20) continue;
                    if(grid[current[0]+2][current[1]]!==0){
                        list.push([current[0]+2,current[1]]);
                        list.push([current[0]+1,current[1]]);
                        stack.push([current[0]+2,current[1]]);
                        newGrid[current[0]+2][current[1]]=0;
                        newGrid[current[0]+1][current[1]]=0;
                    }
                    if(current[0]+2===end[0]&&current[1]===end[1]){
                        list.push([current[0]+1,current[1]]);
                        stack.push([current[0]+2,current[1]]);
                        newGrid[current[0]+1][current[1]]=0;
                    }
                    break;
                case 4:
                    if(current[1]+2>=60) continue;
                    if(grid[current[0]][current[1]+2]!==0){
                        list.push([current[0],current[1]+2]);
                        list.push([current[0],current[1]+1]);
                        stack.push([current[0],current[1]+2]);
                        newGrid[current[0]][current[1]+2]=0;
                        newGrid[current[0]][current[1]+1]=0;
                    }
                    if(current[0]===end[0]&&current[1]+2===end[1]){
                        list.push([current[0],current[1]+1]);
                        stack.push([current[0],current[1]+2]);
                        newGrid[current[0]][current[1]+1]=0;
                    }
                    break;
            }
        }
    }
    // console.log(newGrid);
}

export default DFSMaze;