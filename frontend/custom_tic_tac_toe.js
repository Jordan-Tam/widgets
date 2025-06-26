function render({ model, el }) {

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
                    wins.push(range(j + width*(i-1), 1, num));
                }

                // Vertical win condition
                if (!((i-1) + num > height)) {
                    wins.push(range(j + width*(i-1), width, num));
                }

                // Up-down diagonal win condition (\)
                if (!((j-1) + num > width) && !((i-1) + num > height)) {
                    wins.push(range(j + width*(i-1), width+1, num));
                }

                // Down-up diagonal win condition (/)
                if (!((j-1) - num < 0) && !((i-1) + num > height)) {
                    wins.push(range(j + width*(i-1), width-1, num));
                }

            }

        }

        return wins;

    };

    let gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board");
    el.appendChild(gameBoard);

}