const cells = document.querySelectorAll('.cell');
const textInfo = document.querySelectorAll('.info-right > div')
const names = document.querySelector('.names');
const container = document.querySelector('.container')
let winner = false;

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
            console.log('single player')
            board.playerVsComputer()
        })

        const twoSelect = document.querySelector('.multi')
        twoSelect.addEventListener('click', () => {
            ask.classList += ' hidden';
            names.classList.remove('hidden');
            console.log('two player')
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
            console.log(this.player1.name, this.player2.name)
        })
    }

    play() {
        cells.forEach(cell => cell.addEventListener('click', (e) => { 
            if (this.player1.turn && !winner) {
                e.target.innerText = this.player1.marker
                this.player1.turn = false
                this.checkForWinner()
            } else if (!this.player2.turn && !winner) {
                e.target.innerText = this.player2.marker
                this.player1.turn = true;
                this.checkForWinner()
            } else { return }
        
        }))
    }

    playVsComputer () {
        
    }

    checkForWinner () {

        let player1Score = 0;
        let player2Score = 0;
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
                const winText = document.querySelector('#outcome')
                if (pos0InnerText === 'X') {
                    winText.textContent = `${this.player1.name} Wins`
                } else {
                    winText.textContent = `${this.player2.name} Wins`
                }
                
                winText.classList.remove('hidden')
                // if (pos0InnerText === 'X') {
                //     player1Score++;
                //     document.querySelector('.scoreP1 > .num').innerText = player1Score
                // } else if (pos0InnerText === 'O') {
                //     player2Score++;
                //     document.querySelector('.scoreP2 > .num').innerText = player2Score
                // }
            }
        })
    }


}

class Board {

    constructor(game) {
        this.game = game
        this.game.start()
    }

    playerVsComputer () {
        this.positions = Array.from(cells)
        this.game.playVsComputer();
        console.log('playing vs computer')
    }

    playerVsPlayer () {
        this.game.names();
        this.game.play()
        console.log('player vs player')
    }
}

const game = new TicTacToe()
const board = new Board(game)
