// returns 1D position of a block
const linearPosition = (row, col, elem) => {
    return row*elem + col;
}

// returns 2D position of a block
const arealPosition = (ind, elem) => {
    return { 
        row : Math.floor(ind / elem), 
        col : (ind % elem)
    };
}


// places bombs across the board
const placeBombs = (blocks, percentage, board) => {
    const bombCount = Math.round((blocks*percentage)/100);
    const bombPositions = new Array();
    while(bombPositions.length < bombCount) {
        const newBomb = Math.floor(Math.random()*blocks);
        if(!bombPositions.includes(newBomb))
            bombPositions.push(newBomb);
    }
    bombPositions.forEach(pos=>{
        board[pos] = {
            ...board[pos],
            isBomb: true,
            neighbours: 9
        }
    })
}


// calculates the number of bombs a block is surrounded with
const calculateRisk = (board, elem) => {
    board.forEach(block => {
        if(!block.isBomb) {
            let bombs = 0;
            let { row, col } = arealPosition(block.pos, elem);
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    if(!i && !j) continue;
                    let index = linearPosition(row+i, col+j, elem);
                    if(index>=0 && index<elem*elem && board[index].isBomb)
                        bombs++;
                }
            }
            block.neighbours = bombs;
        }
    })
}


// checks if a block should appear dark or light on board
const pickShade = (ind, elem) => {
    let { row, col } = arealPosition(ind, elem);
    return (row%2 == col%2) ? 'dark' : '';
}


// returns a new board
const generateBoard = elem => {
    const board = Array.from(Array(elem*elem).keys())
                    .map(id => ({ 
                        pos: id,
                        revealed: false,
                        // type: 'grass',
                        isBomb: false,
                        neighbours: 0,
                        shade : pickShade(id, elem)
                    }))
    placeBombs(elem*elem, 20, board);
    calculateRisk(board, elem);
    // console.log(board)
    return board;
}

export default generateBoard