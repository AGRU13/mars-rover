import PriorityQueue from 'js-priority-queue';

const A_star=(start,end,grid,visitedNodesInOrder,parent)=>{
    // visited array to keep track of all the cells that have been explored/expanded by the algorithm
    let visited=Array(20).fill().map(()=>Array(60).fill(0)); 

    //direction arrays for moving into the four neighbouring cells
    let dx=[1,-1,0,0],dy=[0,0,1,-1];

    //distance array for storing the minimum distance calcualted for all the cells from the source cell
    let dist=Array(20).fill().map(()=>Array(60).fill(Infinity));

    /*filling the heuritic array, here we have used manhattan distance for heuristic as it is a 
      consistent heuristic when we can move in four directions only  */
    let heuristic=Array(20).fill().map(()=>Array(60).fill(0));
    for(let i=0;i<20;i++)
        for(let j=0;j<60;j++)
            heuristic[i][j]=Math.abs(end[0]-i)+Math.abs(end[1]-j);

    // creating a priority queue for maintaing all the unvisited cells and to get the cell with minimum f value quickly         
    let pq=new PriorityQueue({comparator: (a,b)=>a[0]-b[0]});

    // inserting the source cell
    pq.queue([heuristic[start[0]][start[1]],...start]);
    visitedNodesInOrder.push([...start]);
    dist[start[0]][start[1]]=0;
    while(pq.length){

        //taking the cell with minimum f value from the list
        let current=pq.peek();
        pq.dequeue();
        visited[current[1]][current[2]]=1;

        //checking if we have reached our destination
        if(current[1]===end[0]&&current[2]===end[1]) break;

        for(let i=0;i<=3;i++){
            // claculating the position of the neighbouring cells
            let x=current[1]+dx[i],y=current[2]+dy[i];
            if(x>=0&&y>=0&&x<20&&y<60){       //checking if the cell if inside the grid
                if(visited[x][y]===0&&grid[x][y]!==1){   //checking if the cell is not a wall or already visited
                    let g=0;
                    if(grid[current[1]][current[2]]===4){
                        // g value if a weighted cell is present
                        g=dist[current[1]][current[2]]+10;  
                    }
                    else g=dist[current[1]][current[2]]+1; 

                    let f=g+heuristic[x][y]; // f value for the cell

                    if(g<dist[x][y]){     //checking if we have found a shorter path of this node

                        //storing the cells in the order they are visited so that they can be used for visualization later 
                        visitedNodesInOrder.push([x,y]);

                        // storing the parent of the current for finding the final path
                        parent[x][y]=[current[1],current[2]]; 

                        //updating the distance
                        dist[x][y]=g;   
                        pq.queue([f,x,y]);
                    }
                }
            }
        }
    }   
}

export default A_star;