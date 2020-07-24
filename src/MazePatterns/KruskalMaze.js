// function to shuffle the array i.e change the position of the elements present it the array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const KruskalMaze=(grid,list)=>{
    let parent=new Array(20)        //array to implement DSU(disjoint union set)
    let edgeSet=[];         //array to store all the edges

    for(let i=0;i<20;i++){
        parent[i]=new Array(60);
        for(let j=0;j<60;j++){
            // setting the of every cell as itself
            parent[i][j]=[i,j];
        }
    }

    // to find the parent of the cell
    const findParent=(v)=>{
        if(v[0]===parent[v[0]][v[1]][0]&&v[1]===parent[v[0]][v[1]][1]) return v;
        return parent[v[0]][v[1]]=findParent(parent[v[0]][v[1]]);
    }

    // to merge two sets/trees
    const union=(a,b)=>{
        let pa=findParent(a);
        let pb=findParent(b);
        if(pa[0]===pb[0]&&pa[1]===pb[1]) return 0;
        parent[pa[0]][pa[1]]=pb;
        return 1;
    }

    for(let i=0;i<20;i+=2){
        for(let j=0;j<60;j+=2){
            // setting every alternate node to a normal cell since every cell in the grid is a wall at the begining of the algorithm
            list.push([i,j]);
            grid[i][j]=0;    

            // cheking if the second cell in the south and east direction is inside the grid and storing the two cells for making a path
            if(i+2<20) edgeSet.push([[i,j],[i+2,j]]); 
            if(j+2<60) edgeSet.push([[i,j],[i,j+2]]);
        }
    }

    shuffleArray(edgeSet);
    for(let i=0;i<edgeSet.length;i++){
        let a=edgeSet[i][0],b=edgeSet[i][1];
        if(union(a,b)){
            list.push([(a[0]+b[0])/2,(a[1]+b[1])/2]);   //converting the middle cell to a normal cell
            grid[(a[0]+b[0])/2][(a[1]+b[1])/2]=0;
        }
    }

}

export default KruskalMaze;