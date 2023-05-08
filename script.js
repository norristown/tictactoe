const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);
    let turn = 0;

    this.start = function() {
        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
        console.log(board.positions)
    }

    function takeTurn() {

        if(turn % 2 === 0) {
            humanPlayer.takeTurn();
        } else {
            computerPlayer.takeTurn();
        }
        turn++;
    }
}

function Board() {
    
    this.positions = Array.from(document.querySelectorAll('.cell'))
    console.log(this.positions)
}

function HumanPlayer(board) {

    this.takeTurn = function() {
        console.log('Human player turn')
    }
}

function ComputerPlayer(board) {

    this.takeTurn = function() {
        console.log('Human player turn')
    }
}