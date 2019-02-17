var usser = {
    usserMoves: [null, null, null, null, null, null, null, null, null, null],
    XorO: '',
    color: '',

    addMove: function (position) {
        usser.usserMoves[position] = position;
    },

}

var computer = {
    computerMoves: [null, null, null, null, null, null, null, null, null, null],
    XorO: '',
    color: '',

    addMove: function (position) {
        computer.computerMoves[position] = position;
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
            gameStatus.filledPositions[boxNum] = boxNum;
            usser.addMove(boxNum);
            setTimeout(function () {
                if(!gameStatus.checkWinner(usser.usserMoves , 'You')){
                    gameStatus.makeComputerMove();
                }
               
            }, 100);
            view.show();
        }
    },

    makeComputerMove: function () {

        var computerMove = computer.generateRndomMove();
        gameStatus.filledPositions[computerMove] = computerMove;
        computer.addMove(computerMove);
        setTimeout(function () {
            gameStatus.checkWinner(computer.computerMoves , 'Computer')
        }, 100);

        view.show();

    },

    checkWinner: function (movesToCheck , whoToCheck) {
        var haveWinner = false;
        var winnerHeader = document.getElementById('winner');
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
        for (var i = 0; i < winningsArr.length; i++) {
            if (movesToCheck[winningsArr[i][0]] === winningsArr[i][0] &&
                movesToCheck[winningsArr[i][1]] === winningsArr[i][1] &&
                movesToCheck[winningsArr[i][2]] === winningsArr[i][2]) {
                haveWinner = true;
            }
        }

        if (haveWinner) {
            gameStatus.resetGame();
            winnerHeader.innerHTML = whoToCheck + 'Won';
            view.show();
        }
        else if (++gameStatus.totalMoves > 8) {
            gameStatus.resetGame();
            winnerHeader.innerHTML = 'It is a draw';
            view.show();
        }

        return haveWinner;
    },

    resetGame: function () {
        gameStatus.firstMove = true;
        gameStatus.filledPositions = [];
        gameStatus.totalMoves = 0;
        usser.XorO = '';
        computer.XorO = '';
        usser.color = '';
        computer.color = '';
        var theBoard = document.getElementById('gameGrid');
        var chooseType = document.getElementById('chooseType');

        var toClean;

        for (var i = 1; i <= 9; i++) {
            usser.usserMoves[i] = null;
            computer.computerMoves[i] = null;
            toClean = document.getElementById(i);
            toClean.innerHTML = '';
        }

        theBoard.style.display = 'none';
        chooseType.style.display = 'block';

    }
}

var view = {

    chooseType: function (element, gameGrid, chooseButtons) {
        gameGrid.style.display = 'grid';
        chooseButtons.style.display = 'none';
        usser.XorO = element.innerHTML;
        if (element.innerHTML === 'X') {
            computer.XorO = 'O';
            computer.color = '#5bc0de';
            usser.color = '#ac2925';
        } else {
            computer.XorO = 'X';
            computer.color = '#ac2925';
            usser.color = '#5bc0de';
        }
    },

    show: function () {
        for (var i = 1; i <= 9; i++) {
            var position = document.getElementById(i);
            if (computer.computerMoves[i] !== null) {
                position.innerHTML = computer.XorO;
                position.style.color = computer.color;
            } else if (usser.usserMoves[i] !== null) {
                position.innerHTML = usser.XorO;
                position.style.color = usser.color;
            }
        }
    },

    setUpListeners: function () {
        var gameGrid = document.getElementById('gameGrid');
        var chooseType = document.getElementById('chooseType');

        gameGrid.addEventListener('click', function () {
            var elementClicked = event.target;
            if (event.target !== gameGrid) {
                    gameStatus.makeUsserMove(elementClicked);
            }
        });

        chooseType.addEventListener('click', function (event) {
            var elementClicked = event.target;
            view.chooseType(elementClicked, gameGrid, chooseType);
        });

    }

};