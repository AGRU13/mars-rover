let dx=[1,-1,0,0],dy=[0,0,1,-1];
let heuristic=Array(20).fill().map(()=>Array(60).fill(0));

// const search=(start,threshold,visitedNodesInOrder,end,grid,parent)=>{
//     let stack=[];
//     stack.push([...start,0]);
//     let min=Infinity;
//     while(!!stack.length){
//         let node=stack.pop();
//         visitedNodesInOrder.push([node[0],node[1]]);
//         let f=node[2]+heuristic[node[0]][node[1]];
//         if(f>threshold) {
//             min=Math.min(min,f);
//             continue;
//         }
//         if(node[0]===end[0]&&node[1]===end[1]) return -1;
//         for(let i=0;i<=3;i++){
//             let x=node[0]+dx[i],y=node[1]+dy[i];
//             let cost=0;
//             if(grid[x][y]===1) continue;
//             if(grid[x][y]===4) cost=10;
//             else cost=1;
//             parent[x][y]=[node[0],node[1]];
//             stack.push([x,y,node[2]+cost]);
//         }
//     }
//     return min;
// }

const search=(node,g,threshold,visitedNodesInOrder,end,grid,parent,parentNode)=>{
    let f=g+heuristic[node[0]][node[1]];
    visitedNodesInOrder.push(node);
    if(f>threshold) return f;
    if(node[0]===end[0]&&node[1]===end[1]) return -1;
    let min=Infinity;
    for(let i=0;i<=3;i++){
        let x=node[0]+dx[i],y=node[1]+dy[i];
        let cost=0;
        if(grid[x][y]===1||(x===parentNode[0]&&y===parentNode[1])) continue;
        if(grid[x][y]===4) cost=10;
        else cost=1;
        parent[x][y]=[...node];
        let temp=search([x,y],g+cost,threshold,visitedNodesInOrder,end,grid,parent,node);
        if(temp===-1) return -1;
        if(temp<min) min=temp;
    }
    return min;
}

const IDAStar=(start,end,grid,visitedNodesInOrder,parent)=>{
    for(let i=0;i<20;i++)
        for(let j=0;j<60;j++)
            heuristic[i][j]=Math.abs(end[0]-i)+Math.abs(end[1]-j);
    
    let threshold=heuristic[start[0]][start[1]];
    let counter=0;
    let parentNode=[-1,-1];
    while(counter<120){
        let temp=search(start,0,threshold,visitedNodesInOrder,end,grid,parent,parentNode);
        if(temp==-1){
            break;
        }
        threshold=temp;
        counter++;
        console.log(counter);
    }
}

export default IDAStar;