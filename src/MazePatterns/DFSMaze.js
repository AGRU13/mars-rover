
// function to shuffle the array i.e change the position of the elements present it the array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const DFSMaze=(start,end,grid,list)=>{
    let stack=[]; // Stack is used in place of recusrion 
    stack.push(start);
    let dir=[1,2,3,4]; 
    let newGrid=[...grid];
    while(stack.length){
        shuffleArray(dir);
        let current=stack.pop(); 
        for(let i=0;i<=3;i++){
            switch(dir[i]){
                //checking if the second cell in the north direction is inside the grid and if it is than make a path
                case 1:     
                    if(current[0]-2<0) continue;
                    if(grid[current[0]-2][current[1]]!==0){
                        list.push([[current[0]-2],current[1]]);
                        list.push([[current[0]-1],current[1]]);
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

                //checking if the second cell in the west direction is inside the grid and if it is than make a path
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
                
                    //checking if the second cell in the south direction is inside the grid and if it is than make a path
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

                    //checking if the second cell in the east direction is inside the grid and if it is than make a path
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
}

export default DFSMaze;