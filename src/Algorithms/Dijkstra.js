import PriorityQueue from 'js-priority-queue'

const Dijkstra=(start,end,grid,list,parent)=>{
    let dx=[1,-1,0,0];
    let dy=[0,0,1,-1];
    let dist=Array(20).fill().map(()=>Array(60).fill(Infinity));
    let pq=new PriorityQueue({comparator: (a,b)=>a[0]-b[0]});
    pq.queue([0,...start]);
    dist[start[0]][start[1]]=0;
    list.push(start);
    while(pq.length){
        let current=pq.peek();
        pq.dequeue();
        if(current[1]===end[0]&&current[2]===end[1]) break;
        if(current[0]!==dist[current[1]][current[2]]) continue;
        for(let i=0;i<=3;i++){
            let x=current[1]+dx[i],y=current[2]+dy[i];
            if(x>=0&&x<20&&y>=0&&y<60)
                if(grid[x][y]!==1){
                    let len=dist[current[1]][current[2]];
                    if(grid[x][y]===4) len+=10;
                    else len+=1;
                    if(len<dist[x][y]){
                        list.push([x,y]);
                        dist[x][y]=len;
                        parent[x][y]=[current[1],current[2]];
                        pq.queue([len,x,y]);
                    }
                }
        }
    }
}

export default Dijkstra;