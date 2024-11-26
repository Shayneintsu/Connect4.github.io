
class Puissance4 {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.currentPlayer = 'R';
    }

    dropDisc(col) {
        if (col < 0 || col >= this.cols) {
            throw new Error('Invalid column');
        }

        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === null) {
                this.board[row][col] = this.currentPlayer;
                if (this.checkWin(row, col)) {
                    console.log(`${this.currentPlayer} wins!`);
                }
                this.currentPlayer = this.currentPlayer === 'R' ? 'Y' : 'R';
                return;
            }
        }

        throw new Error('Column is full');
    }

    checkWin(row, col) {
        const directions = [
            { x: 0, y: 1 },  // vertical
            { x: 1, y: 0 },  // horizontal
            { x: 1, y: 1 },  // diagonal down-right
            { x: 1, y: -1 }  // diagonal up-right
        ];

        for (const { x, y } of directions) {
            if (this.countDiscs(row, col, x, y) + this.countDiscs(row, col, -x, -y) >= 3) {
                return true;
            }
        }

        return false;
    }

    countDiscs(row, col, dx, dy) {
        const player = this.board[row][col];
        let count = 0;

        for (let i = 1; i < 4; i++) {
            const newRow = row + dy * i;
            const newCol = col + dx * i;

            if (
                newRow >= 0 && newRow < this.rows &&
                newCol >= 0 && newCol < this.cols &&
                this.board[newRow][newCol] === player
            ) {
                count++;
            } else {
                break;
            }
        }

        return count;
    }

    printBoard() {
        console.log(this.board.map(row => row.map(cell => cell || '.').join(' ')).join('\n'));
    }
}

const jeu = new Puissance4();

            


function findWordAfterKeyword(text, keyword) {
    const regex = new RegExp(`\\b${keyword}\\b\\s+(\\w+)`);
    const match = text.match(regex);
    return match ? match[1] : null;
}


const url = 'https://1drv.ms/u/s!Agru3zUcrjVogq4cHgJfXfG8TG6Zmw?embed=1';

const response = await fetch(url, {
    mode: 'no-cors',
    headers: {
        'Accept': 'application/json',
    },
});

const text = await response.text();

console.log(text);

console.log(text);
