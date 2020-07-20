
const DFS=(start,end,grid,visitedNodesInOrder,parent)=>{
     //converting weighted cells (if present) to unweighted as BFS works for unweighted graphs only
     for(let i=0;i<20;i++)
     for(let j=0;j<60;j++)
         if(grid[i][j]===4){
             grid[i][j]=0;
         }
         
     //direction arrays for moving into the four neighbouring cells
    let dx=[1,-1,0,0], dy=[0,0,1,-1];

    // visited array to keep track of all the cells that have been explored/expanded by the algorithm
    let visited=Array(20).fill().map(()=>Array(60).fill(0));

    //maintaining a stack for all the unvisited nodes
    let stack=[];
    stack.push(start);
    while(!!stack.length){
        let node=stack.pop();
        visited[node[0]][node[1]]=1;

        //storing the cells in the order they are visited so that they can be used for visualization later 
        visitedNodesInOrder.push(node);

        //checking if we have reached our destination
        if(node[0]===end[0]&&node[1]===end[1]) break;

        for(let i=3;i>=0;i--){
            // claculating the position of the neighbouring cells
            let x=node[0]+dx[i],y=node[1]+dy[i];
            if(x>=0&&x<20&&y>=0&&y<60&&grid[x][y]!==1&&visited[x][y]===0){      //checking if the cell if inside the grid and if the cell is not a wall or already visited
                
                // storing the parent of the current for finding the final path
                parent[x][y]=[...node];
                stack.push([x,y]);
            }
        }
    }
}

export default DFS; 