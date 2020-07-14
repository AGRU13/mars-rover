let src=null,dest=null;

const recursiveDivisionMaze=async(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, type)=>{
    if (rowEnd < rowStart || colEnd < colStart) {
      return;
    }
    if (!surroundingWalls) {
        for(let i=0;i<20;i++){
            for(let j=0;j<60;j++){
                if(i===0||j===0||i===19||j===59){
                    await new Promise((done) => setTimeout(() => done(),10)); //To slow down the animation
                    grid[i][j]=1;
                    document.getElementById(`node-${i}-${j}`).className=`grid-cells__walls`;
                }
            }
        }
        surroundingWalls = true;
    }
    if (orientation === "horizontal") {
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = [];
        for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
            possibleCols.push(number);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        for(let i=rowStart-1;i<=rowEnd+1;i++){
            for(let j=colStart-1;j<=colEnd+1;j++){
                if(i===currentRow&&j!==colRandom&&j>=colStart-1&&j<=colEnd+1){
                    if((i!==src[0]||j!==src[1])&&(i!==dest[0]||j!==dest[1])){
                        await new Promise((done) => setTimeout(() => done(),10)); //To slow down the animation
                        grid[i][j]=1;
                        document.getElementById(`node-${i}-${j}`).className=`grid-cells__walls`;
                    }
                }
            }
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            await recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
        } else {
            await recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls);
        }
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            await recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
        } else {
            await recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        }
    } else {
        let possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        let possibleRows = [];
        for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        for(let i=rowStart-1;i<=rowEnd+1;i++){
            for(let j=colStart-1;j<=colEnd+1;j++){
                if(j===currentCol&&i!==rowRandom&&i>=rowStart-1&&i<=rowEnd+1){
                    if((i!==src[0]||j!==src[1])&&(i!==dest[0]||j!==dest[1])){
                        await new Promise((done) => setTimeout(() => done(),10)); //To slow down the animation
                        grid[i][j]=1;
                        document.getElementById(`node-${i}-${j}`).className=`grid-cells__walls`;
                    }
                }
            }
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            await recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls);
        } else {
            await recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            await recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls);
        } else {
            await recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
        }
    }
};
  
const RecursiveDivision=async(start,end,grid)=>{
    let newGrid=[...grid];
    src=start;
    dest=end;
    await recursiveDivisionMaze(newGrid,2,17,2,57,"horizontal",false);
}

export default RecursiveDivision;