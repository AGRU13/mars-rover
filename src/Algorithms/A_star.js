import PriorityQueue from 'js-priority-queue';

const A_star=(start,end,grid,visitedNodesInOrder,parent)=>{
    let visited=Array(20).fill().map(()=>Array(60).fill(0));
    let dx=[1,-1,0,0],dy=[0,0,1,-1];
    let dist=Array(20).fill().map(()=>Array(60).fill(Infinity));
    let heuristic=Array(20).fill().map(()=>Array(60).fill(0));
    for(let i=0;i<20;i++)
        for(let j=0;j<60;j++)
            heuristic[i][j]=Math.abs(end[0]-i)+Math.abs(end[1]-j);
    let pq=new PriorityQueue({comparator: (a,b)=>a[0]-b[0]});
    pq.queue([heuristic[start[0]][start[1]],...start]);
    dist[start[0]][start[1]]=0;
    while(pq.length){
        let current=pq.peek();
        pq.dequeue();
        visited[current[1]][current[2]]=1;
        if(current[1]===end[0]&&current[2]===end[1]) break;
        for(let i=0;i<=3;i++){
            let x=current[1]+dx[i],y=current[2]+dy[i];
            if(x>=0&&y>=0&&x<20&&y<60){
                if(visited[x][y]===0&&grid[x][y]!==1){
                    let g=0;
                    if(grid[current[1]][current[2]]===4){
                        g=dist[current[1]][current[2]]+10;
                    }
                    else g=dist[current[1]][current[2]]+1;

                    let f=g+heuristic[x][y];
                    if(g<dist[x][y]){     
                        visitedNodesInOrder.push([current[1],current[2]]);
                        parent[x][y]=[current[1],current[2]];
                        dist[x][y]=g;
                        pq.queue([f,x,y]);
                    }
                }
            }
        }
    }   
}

export default A_star;