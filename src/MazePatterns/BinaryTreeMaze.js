// function to shuffle the array i.e change the position of the elements present it the array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const BinaryMaze=(grid,list)=>{
    for(let i=0;i<20;i+=2){
        for(let j=0;j<60;j+=2){
            // setting every alternate node to a normal cell since every cell in the grid is a wall at the begining of the algorithm
            list.push([i,j]);
            grid[i][j]=0;    
        }
    }
    for(let i=0;i<20;i+=2){
        for(let j=0;j<60;j+=2){
            let dir=[];

            // checking if north cell is inside the grid
            if(i>0) dir.push([-1,0]);
            // cheking if west cell is inside the grid 
            if(j>0) dir.push([0,-1]);

            // if no cells are available
            if(dir.length===0) continue;
            shuffleArray(dir);
            
            // taking the first cell from the shuffled array
            grid[i+dir[0][0]][j+dir[0][1]]=0;
            list.push([i+dir[0][0],j+dir[0][1]]);
        }
    }
}

export default BinaryMaze;