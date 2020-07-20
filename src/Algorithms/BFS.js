
const BFS=(start,end,grid,visitedNodesInOrder,parent)=>{
    //converting weighted cells (if present) to unweighted as BFS works for unweighted graphs only
    for(let i=0;i<20;i++)
        for(let j=0;j<60;j++)
            if(grid[i][j]===4){
                grid[i][j]=0;
            }
    
    //maintaining a queue of all the unvisited nodes
    let queue=[start];

    // visited array to keep track of all the cells that have been explored/expanded by the algorithm
    let visited=Array(20).fill().map(()=>Array(60).fill(0));

    //direction arrays for moving into the four neighbouring cells
    let dx=[1,-1,0,0],dy=[0,0,1,-1];
    visited[start[0]][start[1]]=1;

    while(queue.length>0){
        let temp=queue[0];
        queue.shift();      //deleting the first element in the array

        //checking if we have reached our destination
        if(temp[0]===end[0]&&temp[1]===end[1])
            break;
            
        for(let p=0;p<=3;p++){
            // claculating the position of the neighbouring cells
            let x=temp[0]+dx[p],y=temp[1]+dy[p];

            if(x>=0&&y>=0&&x<20&&y<60){         //checking if the cell if inside the grid
                if(visited[x][y]===0&&grid[x][y]!==1){      //checking if the cell is not a wall or already visited
                    visited[x][y]=1;

                    //storing the cells in the order they are visited so that they can be used for visualization later 
                    visitedNodesInOrder.push([x,y]);

                    // storing the parent of the current for finding the final path
                    parent[x][y]=[...temp];
                    queue.push([x,y]);
                }
            }
        }
    }
}

export default BFS;