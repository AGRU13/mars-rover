
const BFS=(start,end,grid,list,parent)=>{
    let queue=[start];
    let visited=Array(20).fill().map(()=>Array(60).fill(0));
    let dx=[1,-1,0,0],dy=[0,0,1,-1];
    visited[start[0]][start[1]]=1;
    while(queue.length>0){
        let temp=queue[0];
        queue.shift();
        if(temp[0]===end[0]&&temp[1]===end[1])
            break;
        for(let p=0;p<=3;p++){
            let x=temp[0]+dx[p],y=temp[1]+dy[p];
            if(x>=0&&y>=0&&x<20&&y<60){
                if(visited[x][y]===0&&grid[x][y]!==1){
                    visited[x][y]=1;
                    list.push([x,y]);
                    parent[x][y]=[...temp];
                    queue.push([x,y]);
                }
            }
        }
    }
}

export default BFS;