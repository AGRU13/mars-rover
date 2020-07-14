function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const KruskalMaze=(start,end,grid,list)=>{
    let parent=new Array(20)
    let edgeSet=[];

    for(let i=0;i<20;i++){
        parent[i]=new Array(60);
        for(let j=0;j<60;j++)
            parent[i][j]=[i,j];
    }

    const findParent=(v)=>{
        if(v[0]===parent[v[0]][v[1]][0]&&v[1]===parent[v[0]][v[1]][1]) return v;
        return parent[v[0]][v[1]]=findParent(parent[v[0]][v[1]]);
    }

    const union=(a,b)=>{
        let pa=findParent(a);
        let pb=findParent(b);
        if(pa[0]===pb[0]&&pa[1]===pb[1]) return 0;
        parent[pa[0]][pa[1]]=pb;
        return 1;
    }

    for(let i=0;i<20;i+=2){
        for(let j=0;j<60;j+=2){
            list.push([i,j]);
            grid[i][j]=0;    
            if(i+2<20) edgeSet.push([[i,j],[i+2,j]]);
            if(j+2<60) edgeSet.push([[i,j],[i,j+2]]);
        }
    }

    shuffleArray(edgeSet);
    for(let i=0;i<edgeSet.length;i++){
        let a=edgeSet[i][0],b=edgeSet[i][1];
        if(union(a,b)){
            list.push([(a[0]+b[0])/2,(a[1]+b[1])/2]);
            grid[(a[0]+b[0])/2][(a[1]+b[1])/2]=0;
        }
    }

}

export default KruskalMaze;