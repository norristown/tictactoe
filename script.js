const getCells = document.querySelectorAll('.cell');
const textInfo = document.querySelectorAll('.info-right > div')
ticTacToeGame();

function resetGame() {
    
    const resetBtn = document.querySelector('.reset')
    resetBtn.addEventListener('click', () => {
        getCells.forEach(cell => {
            cell.innerText = ''
            cell.className = 'cell'
        })
        textInfo.forEach(div => {
            div.className = '';
            div.className = 'hidden'
        })
        ticTacToeGame();
    } )
}

resetGame();

function ticTacToeGame() {

    
    getCells.forEach(cell => cell.addEventListener('click', handleClick))
    let turn = true
    let winner = false;
    let counter = 0;
    let player1Score = 0;
    let player2Score = 0;


    function handleClick(e) {
        if (turn && !winner) {
            e.target.innerText = 'X'
            switchTurn();
        } else if (!turn && !winner) {
            e.target.innerText = 'O'
            switchTurn();
        } else {
            return
        }
        e.target.removeEventListener('click', handleClick)
        checkForWinner()
        counter++;
        if (counter === 9 && winner === false) {
            
            const draw = document.querySelector('#draw')
            draw.classList.remove('hidden')
        }
        
    }

    function switchTurn() {
        turn = !turn;
    }

    function checkForWinner() {

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        const positions = Array.from(getCells)
        winningCombos.forEach(array => {
            const pos0InnerText = positions[array[0]].innerText
            const pos1InnerText = positions[array[1]].innerText
            const pos2InnerText = positions[array[2]].innerText
            const win =
                pos0InnerText !== '' &&
                pos0InnerText == pos1InnerText &&
                pos1InnerText == pos2InnerText
            if (win) {
                winner = true;
                array.forEach(index => positions[index].className += ' winner');
                const winText = document.querySelector(`#${pos0InnerText}`)
                winText.classList.remove('hidden')
                if (pos0InnerText === 'X') {
                    player1Score++;
                    document.querySelector('.scoreP1 > .num').innerText = player1Score
                } else if (pos0InnerText === 'O') {
                    player2Score++;
                    document.querySelector('.scoreP2 > .num').innerText = player2Score
                }
            }
        })
    }
}
