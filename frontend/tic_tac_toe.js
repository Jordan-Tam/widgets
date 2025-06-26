function render({ model, el }) {

    let gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board");
    el.appendChild(gameBoard);

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let squares = [];
    let turn = 0;
    let p1_symbol = "X";
    let p2_symbol = "O";

    let move = (event) => {
        if (event.target.innerHTML) {
            return;
        }
        event.target.innerHTML = turn ? p2_symbol : p1_symbol;
        turn = !turn;
        for (let i = 0; i < win.length; i++) {
            if (squares[win[i][0]].innerHTML &&
                squares[win[i][1]].innerHTML &&
                squares[win[i][2]].innerHTML &&
                squares[win[i][0]].innerHTML === squares[win[i][1]].innerHTML &&
                squares[win[i][0]].innerHTML === squares[win[i][2]].innerHTML
            ) {
                squares[win[i][0]].style.color = "red";
                squares[win[i][1]].style.color = "red";
                squares[win[i][2]].style.color = "red";
                for (let i = 0; i < squares.length; i++) {
                    squares[i].disabled = true;
                }
                break;
            }
        }
        if (squares.filter((s) => s.innerHTML).length === 9) {
            for (let i = 0; i < squares.length; i++) {
                squares[i].disabled = true;
            }
        }
    };

    for (let i = 0; i < 9; i++) {
        let button = document.createElement("button");
        button.classList.add("square");
        button.addEventListener("click", move);
        squares.push(button);
        gameBoard.appendChild(button);
    }

    let reset = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].disabled = false;
            squares[i].innerHTML = "";
            squares[i].style.color = "black";
            turn = 0;
        }
    };

    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.addEventListener("click", reset);
    el.appendChild(resetButton);

}

export default { render };