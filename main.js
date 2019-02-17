var usser = {
    usserMoves: [null, null, null, null, null, null, null, null, null, null],
    XorO: '',

    addMove: function (position) {
        usser.usserMoves[position] = position;
        console.log(gameStatus.totalMoves);
        if (gameStatus.checkWinner(usser.usserMoves)) {
            alert('You wone');
        }
        if (++gameStatus.totalMoves > 8) {
            alert('It is a draw');
        } else {
            gameStatus.makeComputerMove();
        }

    },
}

var computer = {
    computerMoves: [null, null, null, null, null, null, null, null, null, null],
    XorO: '',

    addMove: function (position) {
        computer.computerMoves[position] = position;
        console.log(gameStatus.totalMoves);
        if (gameStatus.checkWinner(computer.computerMoves)) {
            alert('Computer wone');
        }
        if (++gameStatus.totalMoves > 8) {
            alert('It is a draw');
        }


    },


    generateRndomMove: function () {
        var movePosition = Math.floor(Math.random() * 9) + 1;
        var valid = gameStatus.isValidTurn(movePosition);
        while (!valid) {
            movePosition = Math.floor(Math.random() * 9) + 1;
            valid = gameStatus.isValidTurn(movePosition);
        }
        return movePosition;
    }
}

var gameStatus = {
    firstMove: true,
    filledPositions: [],
    totalMoves: 0,


    isValidTurn: function (move) {
        return gameStatus.filledPositions[move] === undefined;
    },

    makeUsserMove: function (element) {
        var boxNum = parseInt(element.id);
        if (gameStatus.isValidTurn(boxNum)) {
            element.innerHTML = usser.XorO;
            gameStatus.filledPositions[boxNum] = boxNum;
            setTimeout(function () {
                usser.addMove(boxNum);
            }, 200);
            
        }
    },

    makeComputerMove: function () {
        var computerMove = computer.generateRndomMove();
        var com = document.getElementById(computerMove);
        com.innerHTML = computer.XorO;
        gameStatus.filledPositions[computerMove] = computerMove;
        computer.addMove(computerMove);
    },

    checkWinner: function (movesToCheck) {
        var haveWinner = false;
        var winningsArr = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
        console.log(movesToCheck);
        for (var i = 0; i < winningsArr.length; i++) {
            if (movesToCheck[winningsArr[i][0]] === winningsArr[i][0] &&
                movesToCheck[winningsArr[i][1]] === winningsArr[i][1] &&
                movesToCheck[winningsArr[i][2]] === winningsArr[i][2]) {
                haveWinner = true;
            }
        }
        return haveWinner;
    },

}

var view = {

    chooseType: function (element, gameGrid, chooseButtons) {
        gameGrid.style.display = 'grid';
        chooseButtons.style.display = 'none';
        usser.XorO = element.innerHTML;
        if (element.innerHTML === 'X') {
            computer.XorO = 'O';
        } else {
            computer.XorO = 'X';
        }
    },


    setUpListeners: function () {
        var gameGrid = document.getElementById('gameGrid');
        var chooseType = document.getElementById('chooseType');

        gameGrid.addEventListener('click', function () {
            var elementClicked = event.target;
            gameStatus.makeUsserMove(elementClicked);

        });

        chooseType.addEventListener('click', function (event) {
            var elementClicked = event.target;
            view.chooseType(elementClicked, gameGrid, chooseType);
        });

    }

};
view.setUpListeners();