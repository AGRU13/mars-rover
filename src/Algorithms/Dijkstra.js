import PriorityQueue from 'js-priority-queue'

const Dijkstra=(start,end,grid,visitedNodesInOrder,parent)=>{

    //direction arrays for moving into the four neighbouring cells
    let dx=[1,-1,0,0],dy=[0,0,1,-1];

    //distance array for storing the minimum distance calcualted for all the cells from the source cell
    let dist=Array(20).fill().map(()=>Array(60).fill(Infinity));

    // creating a priority queue for maintaing all the unvisited cells and to get the cell with minimum distance value quickly
    let pq=new PriorityQueue({comparator: (a,b)=>a[0]-b[0]});
    pq.queue([0,...start]);
    dist[start[0]][start[1]]=0;
    visitedNodesInOrder.push(start);
    while(pq.length){
        let current=pq.peek();
        pq.dequeue();

        //checking if we have reached our destination
        if(current[1]===end[0]&&current[2]===end[1]) break;

        //if minimum distance for the node is already calculated 
        if(current[0]!==dist[current[1]][current[2]]) continue;


        for(let i=0;i<=3;i++){
            // claculating the position of the neighbouring cells
            let x=current[1]+dx[i],y=current[2]+dy[i];
            if(x>=0&&x<20&&y>=0&&y<60)      //checking if the cell if inside the grid
                if(grid[x][y]!==1){         //checking if the cell is not a wall 
                    let len=dist[current[1]][current[2]];

                    if(grid[x][y]===4) len+=10;     //if the cell is weighted
                    else len+=1;
                    if(len<dist[x][y]){             //if the new distance is less than previously calculated distance

                        //storing the cells in the order they are visited so that they can be used for visualization later
                        visitedNodesInOrder.push([x,y]);

                        dist[x][y]=len; //updating the distance from the source

                        // storing the parent of the current for finding the final path
                        parent[x][y]=[current[1],current[2]];
                        pq.queue([len,x,y]);
                    }
                }
        }
    }
}

export default Dijkstra;