ticTacToeGame();

function resetGame() {

    const resetBtn = document.querySelector('button')
    resetBtn.addEventListener('click', () => {
        console.log('reset')
    })
}

resetGame();


function ticTacToeGame() {

    const getCells = document.querySelectorAll('.cell');
    getCells.forEach(cell => cell.addEventListener('click', handleClick))
    let turn = true
    let winner = false;
    let counter = 0;

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
        if (counter === 9) {
            console.log('draw')
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
                console.log(`${pos0InnerText} wins`)
                
                array.forEach(index => positions[index].className += ' winner');
                const winText = document.querySelector(`.${pos0InnerText}`)
                winText.classList.remove('hidden')
            }
        })
    }
}