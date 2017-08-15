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
        tileCount = (Number(scale.value)===6) ? 5: Number(scale.value);
        tileSize = boardSize / tileCount;
        correctAnswers.length = [];

        if (puzzleBackground) {
            while (puzzleBackground.firstChild) {
                puzzleBackground.removeChild(puzzleBackground.firstChild);
            }
        }

        cutImageUp();
        imgPosition();
    };

    // Using canvas to cut the image up in pieces
    const cutImageUp = () => {
        let imagePieces = [],
            PuzzleColls = tileCount,
            PuzzleRows = tileCount,
            imgPieceWidth = tileSize,
            imgPieceHeigth = tileSize,
            canvas,
            context,
            yPosition,
            xPosition;

        // slice img into pieces that are equal to tile count
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

    const setBackgroundImage = (imgURL) => {
        let li,
            allPuzzlePieces = [],
            images = imgURL.slice(1, imgURL.length);

        imgURL.map((img, i) => {
            li = document.createElement('li');

            puzzleBackground.appendChild(li);

            hiddenElement = document.querySelector('li');
            hiddenElement.classList.add('hide-puzzle');

            li.setAttribute('class',`piece-${i} pieces`);
            li.style.backgroundImage = 'url('+img+')';
            li.style.height =  `${tileSize-1}px`;
            li.style.width = `${tileSize-1}px`;

        });
    };

    const increasePositionX = (check) =>{
        (increase === true && positionX !== boardSize) ?
            (positionX += tileSize) :
            (positionX = tileSize);

        return positionX;
    };

    const createAnswers = (amount, positionY) =>{

        if(amount > 1 ){

            if( posY <= (boardSize/2) && tileCount >= 4){
                posY += tileSize;

            }else if(tileCount>= 4){

                posY = 0;
                posX += tileSize;

            }else{

                if(!(amount % 2)) {

                    posY += tileSize;

                }else{
                    
                    posY = 0;
                    posX += tileSize;
                    
                }
            }
        }

        correctAnswers.push({x: posX, y: posY, elementNumber: amount});
    };

    const imgPosition = () =>{
        let images,
            positionY = 0,
            index = 1,
            i,
            j;

            allPuzzlePieces = Array.prototype.slice.call(document.querySelectorAll('.pieces'));
            boardParts = new Array(tileCount);

            // multidimentional array that holds the empty location and all x and y positions of all puzzle pieces
            for (i = 0; i < tileCount; ++i) {

                boardParts[i] = new Array(tileCount);

                for (j = 0; j < tileCount; ++j) {
                    increase = true;
                    boardParts[i][j] = new Object();

                    if(positionX === boardSize && positionY !== boardSize){

                        positionY += tileSize;

                    }

                    boardParts[i][j].x = increasePositionX() - tileSize;
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
        position = 0;
        posY = 0;
        posX = 0;
        currentPositions = [];
    };

    const getTransformValue = (myElement) =>{
        let style = window.getComputedStyle(myElement);
        let matrix = new WebKitCSSMatrix(style.webkitTransform);

        return {

            translateX: matrix.m41,
            translateY: matrix.m42

        };
    };

    const moveTile = (element, toLoc, fromLoc, newLocaton) =>{
        if (!solved) {

            element.style.transform = `translate(${emptyLoc.locationX}px, ${emptyLoc.locationY}px)`;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            emptyLoc.locationX = newLocaton.translateX;
            emptyLoc.locationY = newLocaton.translateY;
        }
    };

    // check to see if the current image is next to the empty
    const checkDistance = (fromX, fromY, toX, toY) =>{

        return Math.abs(fromX - toX) + Math.abs(fromY - toY);
    };

    const moveObjects = (e) => {

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

    const compareAnswers = (array1, array2) =>{

      // compare array array1 with array2 by using
        let compareArrays = array1.filter(function(valueArray1, index, obj){
            let findMatch = array2.findIndex( function (valueArray2){

                  return valueArray1.x === valueArray2.x &&
                         valueArray1.y === valueArray2.y &&
                         valueArray1.elementNumber === valueArray2.elementNumber;
            });

            return findMatch > -1;

        });

        return (compareArrays.length !== array1.length) ? false : true;
    };

    const checkSolved = () =>{
        let i = 1;

        allPuzzlePieces.map((puzzlePiece) =>{
            currentPositions.push({x: getTransformValue(puzzlePiece).translateX, y: getTransformValue(puzzlePiece).translateY, elementNumber: i });
            i++;
        });
        
        // remove the first element because this element is hidden
        currentPositions.shift();

        solved = compareAnswers(currentPositions, correctAnswers);

        if(solved){
            hiddenElement.classList.remove('hide-puzzle');

            allPuzzlePieces.map((puzzlePiece) =>{
                puzzlePiece.style.height =  `${tileSize}px`;
                puzzlePiece.style.width= `${tileSize}px`;
            });
        }

        currentPositions.length = [];
    };

    init();
}
