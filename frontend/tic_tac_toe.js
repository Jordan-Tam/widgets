function render({ model, el }) {

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

    let move = (event) => {
        if (event.target.innerHTML) {
            return;
        }
        event.target.innerHTML = turn ? "O" : "X";
        turn = !turn;
        for (let i = 0; i < win.length; i++) {
            if (squares[win[i][0]].innerHTML &&
                squares[win[i][1]].innerHTML &&
                squares[win[i][2]].innerHTML &&
                squares[win[i][0]].innerHTML === squares[win[i][1]].innerHTML &&
                squares[win[i][0]].innerHTML === squares[win[i][2]].innerHTML
            ) {

                for (let j = 0; j < squares.length; j++) {
                    squares[j].style.color = "rgba(16, 16, 16, 0.3)";
                    squares[j].disabled = true;
                }
                for (let j = 0; j < win[i].length; j++) {
                    squares[win[i][j]].style.color = "red";
                }
                break;
            }
        }
        if (squares.filter((s) => s.innerHTML).length === 9) {
            for (let i = 0; i < squares.length; i++) {
                squares[i].style.color = "rgba(16, 16, 16, 0.3)";
                squares[i].disabled = true;
            }
        }
    };

    let gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board");
    el.appendChild(gameBoard);

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
    resetButton.classList.add("reset");
    resetButton.addEventListener("click", reset);
    el.appendChild(resetButton);

}

export default { render };