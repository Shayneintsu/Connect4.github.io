
class Puissance4 {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.currentPlayer = 'R';
        this.lastMove = -1;
    }

    dropDisc(col) {
        if (col == -1){
            return false;
        }
        if (col < -1 || col >= this.cols) {
            throw new Error('Invalid column');
        }

        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === null) {
                this.board[row][col] = this.currentPlayer;
                this.lastMove = row*this.cols+col;
                if (this.checkWin(row, col)) {
                    console.log(`${this.currentPlayer} wins!`);
                    return true;
                }
                this.currentPlayer = this.currentPlayer === 'R' ? 'Y' : 'R';
                return false;
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

    namePlayer(){
        return this.currentPlayer;
    }

    printBoard() {
        console.log(this.board.map(row => row.map(cell => cell || '.').join(' ')).join('\n'));
    }
}

const jeu = new Puissance4();






async function send(cell,finish,color)
{
    const url = 'https://prod-10.francecentral.logic.azure.com:443/workflows/ed82e312a7504228bbbabace9b6cbffd/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0kqkJtZoSFt_aKYiXewoo3hODcVDauJ0-keWO1EbIOQ';

    const data = `{
    "type": "message",
    "attachments": [
        {
        "contentType": "Action",
        "content": {
            "type": "${finish ? 'end' : 'continue'}",
            "version": "1.0",
            "body": [
            {
                "type": "${cell}"
            },
            {
                "type": "${color}"
            }
            ]
        }
        }
    ]
    }`;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data,
    });


    window.location.replace('https://github.com/Shayneintsu/Connect4.github.io/blob/main/README.md');
}


function getNthMatch(text, regex, n) {
    let match;
    let count = 0;
    while ((match = regex.exec(text)) !== null) {
        count++;
        if (count === n) {
            return match[1];
        }
    }
    return null;
}



const currentUrl = window.location.href;
const parsedUrl = new URL(currentUrl);
const params = new URLSearchParams(parsedUrl.search);

const param = params.get('cell');
if(param == "0")
{
    window.location.replace('https://github.com/Shayneintsu/Connect4.github.io/blob/main/README.md');
}
else if(param == "-1")
{
    send('0',true,'null');
}
else
{
    const paramint = parseInt(param,10);

    if (paramint > 0 && paramint < 8)
    {

        const regex = /"name":"([^"]*)"/g;

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://1drv.ms/u/s!Agru3zUcrjVogq4cHgJfXfG8TG6Zmw?embed=1';
        const url = proxyUrl + targetUrl;

        (async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.text();
                
        
                var pastmove = getNthMatch(data, regex, 2)
                const intArray = pastmove.split('');
                for (const char of intArray) { 
                    const int = parseInt(char, 10);
                    if (jeu.dropDisc(int-1))
                    {
                        throw new Error('Game already finished!');
                    }
                    
                }
        
                
                try 
                {
                    const player = jeu.namePlayer();
                    const win = jeu.dropDisc(paramint-1);
                    const move = jeu.lastMove;
                    jeu.printBoard();
                    send(move,win,player);
                    
                }
                catch (error)
                {
                    console.log(error);
                }
                
        
        
            } catch (error) {
                console.error('Fetch error:', error);
            }
        })();


    }

}


