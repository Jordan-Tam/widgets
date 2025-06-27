function render({ model, el }) {

    let debug = document.createElement("p");
    debug.hidden = true;

    let range = (start, step, range_len) => {
        let new_range = [start];
        for (let i = 0; i < range_len - 1; i++) {
            new_range.push(new_range[new_range.length - 1] + step);
        }
        return new_range;
    };

    let compute_wins = (height, width, num) => {

        let wins = [];

        for (let i = 1; i <= height; i++) {
            
            for (let j = 1; j <= width; j++) {

                // Horizontal win condition
                if (!((j-1) + num > width)) {
                    wins.push(range(j + width*(i-1), 1, num).map(x => x - 1));
                }

                // Vertical win condition
                if (!((i-1) + num > height)) {
                    wins.push(range(j + width*(i-1), width, num).map(x => x - 1));
                }

                // Up-down diagonal win condition (\)
                if (!((j-1) + num > width) && !((i-1) + num > height)) {
                    wins.push(range(j + width*(i-1), width+1, num).map(x => x - 1));
                }

                // Down-up diagonal win condition (/)
                if (!(j - num < 0) && !((i-1) + num > height)) {
                    wins.push(range(j + width*(i-1), width-1, num).map(x => x - 1));
                }

            }

        }

        debug.innerHTML = wins;
        return wins;

    };

    let board_height = model.get("board_height");
    let board_width = model.get("board_width");
    let num_players = model.get("num_players");
    let in_a_row = model.get("in_a_row");
    let win = compute_wins(board_height, board_width, in_a_row);
    let squares = [];
    let turn = 0;
    let player_symbols = ["X", "O", "◼", "▲"]; // use turn to index into this list

    let move = (event) => {
        if (event.target.innerHTML) {
            return;
        }
        event.target.innerHTML = player_symbols[turn];
        turn = (turn + 1) % num_players;

        outerloop:
        for (let i = 0; i < win.length; i++) {

            // Check if any of the squares are empty.
            for (let j = 0; j < win[i].length; j++) {
                if (!squares[win[i][j]].innerHTML) {
                    continue outerloop;
                }
            }

            // Check if all the squares match.
            for (let j = 0; j < win[i].length - 1; j++) {
                if (!(squares[win[i][j]].innerHTML === squares[win[i][j+1]].innerHTML)) {
                    continue outerloop;
                }
            }

            // Change styling of the winning squares and end the game.
            for (let j = 0; j < squares.length; j++) {
                squares[j].style.color = "rgba(16, 16, 16, 0.3)";
                squares[j].disabled = true;
            }
            for (let j = 0; j < win[i].length; j++) {
                squares[win[i][j]].style.color = "red";
            }

        }
        if (squares.filter((s) => s.innerHTML).length === board_height*board_width) {
            for (let j = 0; j < squares.length; j++) {
                squares[j].style.color = "rgba(16, 16, 16, 0.3)";
                squares[j].disabled = true;
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

    el.appendChild(debug);

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

    function recreateBoard() {
        board_height = model.get("board_height");
        board_width = model.get("board_width");
        num_players = model.get("num_players");

        gameBoard.innerHTML = ""; // Delete all child elements

        squares = []; // Empty squares element list

        gameBoard.style.gridTemplateColumns = `repeat(${board_width}, 1fr)`;

        for (let i = 0; i < board_height*board_width; i++) {
            let button = document.createElement("button");
            button.classList.add("square");
            button.addEventListener("click", move);
            squares.push(button);
            gameBoard.appendChild(button);
        }

        turn = 0;
        // Call reset()?

        win = compute_wins(board_height, board_width, in_a_row);

    }

    model.on("change:board_height", recreateBoard);
    model.on("change:board_width", recreateBoard);
    model.on("change:num_players", () => {
        reset();
        num_players = model.get("num_players");
        // update input elements that allow users to use custom symbols
    });
    model.on("change:in_a_row", () => {
        reset();
        in_a_row = model.get("in_a_row");
        win = compute_wins(board_height, board_width, in_a_row);
    })

}

export default { render };


// turn           = 0
// turn = (0+1)%2 = 1
// turn = (1+1)%2 = 0
// turn = (0+1)%2 = 1

// turn           = 0
// turn = (0+1)%3 = 1
// turn = (1+1)%3 = 2
// turn = (2+1)%3 = 0
// turn = (0+1)%3 = 1