{
    // global variables
    const image = new Image(),
          puzzleBackground = document.querySelector(".puzzle-background"),
          scale = document.getElementById('scale');

    let boardSize,
        boardParts,
        allPuzzlePieces,
        tileCount = Number(scale.value),
        tileSize,
        increase = false,
        solved = false,
        positionX = 0,
        correctAnswers=[],
        currentPositions =[],
        positionD = 0,
        positionXD = 0,
        posY = 0,
        posX = 0,
        clickLoc = new Object(),    // current element
        emptyLoc = new Object();    // empty spot where the img can go
        clickLoc.x = 0;
        clickLoc.y = 0;
        emptyLoc.x = 0;
        emptyLoc.y = 0;


    const init = () => {
        puzzleBackground.addEventListener("click", moveObjects, false);
        scale.addEventListener("change", setBoard, false);

        image.onload = () => {
            boardSize = image.width;
            puzzleBackground.style.height =  `${boardSize}px`;
            puzzleBackground.style.width= `${boardSize}px`;

            setBoard();
        };

        image.src = './../img/monks.jpg';
    };

    const setBoard = () => {
        tileCount = Number(scale.value);
        tileSize = boardSize / tileCount;
        correctAnswers.length = 0;

        if (puzzleBackground) {
            while (puzzleBackground.firstChild) {
                puzzleBackground.removeChild(puzzleBackground.firstChild);
            }
        }

        cutImageUp();
        imgPosition();
    };

    const getTransformValue = (myElement) => {
        let style = window.getComputedStyle(myElement);
        let matrix = new WebKitCSSMatrix(style.webkitTransform);

        return {

            translateX: matrix.m41,
            translateY: matrix.m42

        };
    };

    // Using canvas api top cut the img up in pieces
    const cutImageUp = () => {
        let imagePieces = [],
            PuzzleColls = tileCount,
            PuzzleRows = tileCount,
            imgPieceWidth = tileSize,//img width should be equal to picture width / PuzzleColls
            imgPieceHeigth = tileSize,//img height should be equal to picture width / PuzzleRows
            canvas,
            context,
            yPosition,
            xPosition;

        // slice img into 4 pieces 2 rows and 2 collumns
        for(xPosition = 0; xPosition < PuzzleColls; xPosition++) {
            for(yPosition = 0; yPosition < PuzzleRows; yPosition++) {

                canvas = document.createElement('canvas');
                context = canvas.getContext('2d');
                canvas.width = imgPieceWidth;
                canvas.height = imgPieceHeigth;

                context.drawImage(image, xPosition * imgPieceWidth, yPosition * imgPieceHeigth, imgPieceWidth, imgPieceHeigth, 0, 0, canvas.width, canvas.height);

                imagePieces.push(canvas.toDataURL());

            }
        }

        setBackgroundImage(imagePieces);
    };

    const increasePosition = (check) =>{
        if(increase === true && positionX !== boardSize){

            positionX += boardSize/tileCount;

        }else{
            positionX = boardSize/tileCount;

        }
        return positionX;
    };

    const createAnswers = (amount, positionY) => {

        let test = !(amount % 2);

        if(amount > 1 ){

            if( posY <= (boardSize/2) && tileCount>= 4){
                posY+= tileSize;

            }else if(tileCount>= 4){

                posY = 0;
                posX+=tileSize;

            }else{

                if(test) {

                    posY+=tileSize;
                }else{
                    posY = 0;
                    posX+=tileSize;

                }
            }

        }

        correctAnswers.push({x: posX, y: posY, elementNumber: amount});
    };

    const imgPosition = () => {
        let images,
            positionY = 0,
            index = 1,
            size = 0,
            i,
            j;

            allPuzzlePieces = Array.prototype.slice.call(document.querySelectorAll('.pieces'));

            boardParts = new Array(tileCount);

            for (i = 0; i < tileCount; ++i) {

                boardParts[i] = new Array(tileCount);

                for (j = 0; j < tileCount; ++j) {

                    size = boardSize/tileCount;
                    increase = true;
                    boardParts[i][j] = new Object;

                    if(positionX === boardSize && positionY !== boardSize){

                        positionY += size;

                    }

                    boardParts[i][j].x = increasePosition() - size;
                    boardParts[i][j].y = positionY;
                    boardParts[i][j].xLoc = (tileCount-1) - i;
                    boardParts[i][j].yLoc = (tileCount-1) - j;

                    if(index < allPuzzlePieces.length){

                        allPuzzlePieces[index].style.transform = `translate(${boardParts[i][j].x}px, ${boardParts[i][j].y}px)`;

                    }
                    if(index > 0){

                        createAnswers(index, positionY);

                        index++;
                    }

                }
            }

            resetValues();
            correctAnswers.shift();

      };

    const resetValues = () =>{
            emptyLoc.x = boardParts[tileCount-1][tileCount-1].x / tileSize;
            emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y / tileSize;
            emptyLoc.locationX = boardParts[tileCount - 1][tileCount - 1].y;
            emptyLoc.locationY = boardParts[tileCount - 1][tileCount - 1].x;

            solved = false;
            increase = false;
            positionY = 0;
            positionX = 0;
            positionD = 0;
            positionXD = 0;
            position=0;
            posY = 0;
            posX = 0;
            currentPositions = [];

    };

    const setBackgroundImage = (imgURL) => {
        let li,
            allPuzzlePieces = [],
            images = imgURL.slice(1, imgURL.length);

        imgURL.map((img, i) => {
            li = document.createElement('li');
            puzzleBackground.appendChild(li);
            hiddenElement = document.querySelector('li');
            hiddenElement.classList.add('hide');

            li.setAttribute('class',`piece-${i} pieces`);

            li.style.backgroundImage = 'url('+img+')';
            li.style.height =  `${boardSize/tileCount-1}px`;
            li.style.width= `${boardSize/tileCount-1}px`;

        });
    };

    const moveTile = (element, toLoc, fromLoc, newLocaton) => {
        if (!solved) {

            element.style.transform = `translate(${emptyLoc.locationX}px, ${emptyLoc.locationY}px)`;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            emptyLoc.locationX = newLocaton.translateX;
            emptyLoc.locationY = newLocaton.translateY;
        }
    };

    const moveObjects = (e) => {
        let checksum;

        if (e.target !== e.currentTarget) {

            clickLoc.x = getTransformValue(e.target).translateX / tileSize;
            clickLoc.y = getTransformValue(e.target).translateY / tileSize;

            if (checkDistance(clickLoc.x , clickLoc.y, emptyLoc.x, emptyLoc.y) ===  1) {

                moveTile(e.target, emptyLoc, clickLoc, getTransformValue(e.target));

                setTimeout(function(){
                    checkSolved();
                }, 400);
            }
        }
        e.stopPropagation();
    };

    // check to see if images can move or not
    const checkDistance = (fromX, fromY, toX, toY) => {

        return Math.abs(fromX - toX) + Math.abs(fromY - toY);
    };

    const compareAnswers = (array1, array2) => {

      // This block will make the array of indexed that array b contains a elements
        let compareArrays = array1.filter(function(value, index, obj) {

            let index2 = array2.findIndex( function (element) {

                  return value.x=== element.x && value.y === element.y && value.elementNumber === element.elementNumber;
            });

            return index2 > -1;

        });

      //TODO
      return (compareArrays.length !== array1.length) ? false : true;
    };


    const checkSolved = () => {

        i = 1;

        allPuzzlePieces.map((puzzlePiece) => {

            currentPositions.push({x: getTransformValue(puzzlePiece).translateX, y: getTransformValue(puzzlePiece).translateY, elementNumber: i });
            i++;
        });
        // remove the first element because this element is hidden
        currentPositions.shift();

        solved = compareAnswers(currentPositions, correctAnswers);

        if(solved){

            hiddenElement.classList.remove('hide');

            allPuzzlePieces.map((puzzlePiece) => {
                puzzlePiece.style.height =  `${boardSize/tileCount}px`;
                puzzlePiece.style.width= `${boardSize/tileCount}px`;
            });
        }

        currentPositions = [];

    };




















    init();
}
