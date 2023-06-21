const cells = document.querySelectorAll('.cell');
const textInfo = document.querySelectorAll('.info-right > div')
const names = document.querySelector('.names');
const container = document.querySelector('.container')
let winner = false;
let counter = 0;
let pve = false;
let pvp = false;
class TicTacToe {

    constructor(a, b) {
        a = {
            marker: "X",
            turn: true,
            name: a
        }

        b = {
            marker: "O",
            turn: false,
            name: b
        }

        this.player1 = a
        this.player2 = b
    }

    start() {
        const ask = document.querySelector('.ask')
        const singleSelect = document.querySelector('.single')
        singleSelect.addEventListener('click', () => {
            ask.classList += ' hidden';
            container.classList.remove('hidden');
            board.playerVsComputer()
        })

        const twoSelect = document.querySelector('.multi')
        twoSelect.addEventListener('click', () => {
            ask.classList += ' hidden';
            names.classList.remove('hidden');
            board.playerVsPlayer()
        })
    }

    names() {
        const p1Input = document.querySelector('#p1Name');
        const p2Input = document.querySelector('#p2Name');
        const submit = document.querySelector('.submit');
        submit.addEventListener('click', () => {
            this.player1.name = p1Input.value !== '' ? p1Input.value : 'Player One'
            this.player2.name = p2Input.value !== '' ? p2Input.value : 'Player Two'
            container.classList.remove('hidden');
            names.classList += ' hidden'
        })
    }

    playVsPlayer() {
        pvp = true;
        cells.forEach(cell => cell.addEventListener('click', (e) => {
            if (e.target.innerText === 'X' || e.target.innerText === 'O') {
                return
            } else {
                if (this.player1.turn && !winner) {
                    e.target.innerText = this.player1.marker
                    this.player1.turn = false
                    counter++;
                    this.checkForWinner()
                } else if (!this.player2.turn && !winner) {
                    e.target.innerText = this.player2.marker
                    this.player1.turn = true;
                    counter++
                    this.checkForWinner()
                } else { 
                    return
                } 
            }
        }))
    }

    playVsComputer () {
        pve = true;
        cells.forEach(cell => cell.addEventListener('click', (e) => {
            if (e.target.innerText === 'X' || e.target.innerText === 'O') {
                return
            } else {
                if (!winner) {
                    e.target.innerText = this.player1.marker
                    this.player1.turn = false
                    counter++;
                    this.checkForWinner()
                    this.computerMove()
                    this.checkForWinner()
                } else { 
                    return
                } 
            }
        }))
    }

    computerMove() {
        const positions = Array.from(cells)
        const availablePositions = positions.filter(cell => cell.innerText === '')
        const move = Math.floor(Math.random() * availablePositions.length)
        availablePositions[move].innerText = 'O'
        counter++;
    }

    checkForWinner () {
        const positions = Array.from(cells)
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

        winningCombos.forEach(array => {
            const winText = document.querySelector('#outcome')
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
                if (pos0InnerText === 'X') {
                    if (pvp) {
                        winText.textContent = `${this.player1.name} Wins`
                    } else {
                        winText.textContent = `You Win :)`
                    }
                } else {
                    if (pvp) {
                        winText.textContent = `${this.player2.name} Wins`
                    } else {
                        winText.textContent = 'You Lose :('
                    }
                }
                winText.classList.remove('hidden')
            } else if (!winner && counter === 9) {
                winText.textContent = 'Draw'
                winText.classList.remove('hidden')
            }
        })
    }

    reset () {
        const resetBtn = document.querySelector('.reset')
        resetBtn.addEventListener('click', () => {
            cells.forEach(cell => {
                cell.innerText = ''
                cell.className = 'cell'
            })
        const outcome = document.querySelector('#outcome');
        outcome.className = '';
        outcome.className = 'hidden'
        outcome.textContent = ''
        winner = false;
        counter = 0;
        })
    }
}

class Board {

    constructor(game) {
        this.game = game
        this.game.start()
    }

    playerVsComputer () {
        this.game.playVsComputer();
        console.log('playing vs computer')
        this.game.reset();
    }

    playerVsPlayer () {
        this.game.names();
        this.game.playVsPlayer()
        console.log('player vs player')
        this.game.reset();
    }
}

const game = new TicTacToe()
const board = new Board(game)