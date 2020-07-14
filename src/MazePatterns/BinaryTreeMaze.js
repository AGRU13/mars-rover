function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const BinaryMaze=(start,end,grid,list)=>{
    for(let i=0;i<20;i+=2){
        for(let j=0;j<60;j+=2){
            list.push([i,j]);
            grid[i][j]=0;    
        }
    }
    for(let i=0;i<20;i+=2){
        for(let j=0;j<60;j+=2){
            let dir=[];
            if(i>0) dir.push([-1,0]);
            if(j>0) dir.push([0,-1]);
            if(dir.length===0) continue;
            shuffleArray(dir);
            grid[i+dir[0][0]][j+dir[0][1]]=0;
            list.push([i+dir[0][0],j+dir[0][1]]);
        }
    }
}

export default BinaryMaze;