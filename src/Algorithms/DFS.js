
const DFS=(start,end,grid,visitedNodesInOrder,parent)=>{
     //using dom element manipulation so as to not cause any rerender
     for(let i=0;i<20;i++)
     for(let j=0;j<60;j++)
         if(grid[i][j]===4){
             grid[i][j]=0;
             document.getElementById(`node-${i}-${j}`).className=`grid-cells`;
         }
         
    let dx=[1,-1,0,0];
    let dy=[0,0,1,-1];
    let visited=Array(20).fill().map(()=>Array(60).fill(0));
    let stack=[];
    stack.push(start);
    while(!!stack.length){
        let node=stack.pop();
        visited[node[0]][node[1]]=1;
        visitedNodesInOrder.push(node);
        if(node[0]===end[0]&&node[1]===end[1]) break;
        for(let i=3;i>=0;i--){
            let x=node[0]+dx[i],y=node[1]+dy[i];
            if(x>=0&&x<20&&y>=0&&y<60&&grid[x][y]!==1&&visited[x][y]===0){
                parent[x][y]=[...node];
                stack.push([x,y]);
            }
        }
    }
}

export default DFS; 