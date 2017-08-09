{
    const image = new Image();
    const puzzleBackground = document.querySelector(".puzzle-background");
    let index2 = 30;
    // let allPuzzlePieces = Array.prototype.slice.call(document.querySelectorAll('.pieces'));
    let maxPosition = 164;
    // allPuzzlePieces[0].getBoundingClientRect().width + Number(window.getComputedStyle(allPuzzlePieces[0], null).margin.split('px')[0])
    let minPosition = 0;
    let boardSize;
    let scale = document.getElementById('scale');
    let tileCount = scale.value;
    let increase = false;
    let position = 0;

// current element
    var clickLoc = new Object;
    clickLoc.x = 0;
    clickLoc.y = 0;

// empty spot where the img can go
    let emptyLoc = new Object;
    emptyLoc.x = 0;
    emptyLoc.y = 0;

    let solved = false;

    // let boardParts;

    const init = () => {
        puzzleBackground.addEventListener("click", moveObjects, false);
        scale.addEventListener("change", setBoard, false);

        image.onload = () => {
            boardSize = image.width;
            puzzleBackground.style.height =  `${boardSize+1}px`;
            puzzleBackground.style.width= `${boardSize+1}px`;
            setBoard();
            // imgPosition();

        };

        image.src = './../img/monks.jpg';
    };





    const setBoard = () => {

        if (puzzleBackground) {
            while (puzzleBackground.firstChild) {
                  puzzleBackground.removeChild(puzzleBackground.firstChild);
            }
        }

        tileCount = scale.value;
        tileSize = boardSize / tileCount;
        cutImageUp();
        imgPosition();
    };




    // Calculate all posible positions
    // const positionCombinations = () => {
    //     let positionNumbers = [],
    //         positions = [minPosition, maxPosition],
    //         allPositions = positions.length,
    //         i,
    //         j;

    //     for(i = 0; i < allPositions; i++){
    //         for(j = 0; j < allPositions; j++){
    //         // array with all posible positions
    //          positionNumbers.push({top: positions[i], left: positions[j]});
    //         }
    //     }

    //     return shuffleImages(positionNumbers);
    // };





   //  const getPosition = (element) => {
   //      let xPosition = 0;
   //      let yPosition = 0;

   //      if(element){

   //        xPosition +=  (Math.round(element.getBoundingClientRect().left) - element.scrollLeft + element.clientLeft);
   //        yPosition += (Math.round(element.getBoundingClientRect().top) - element.scrollTop + element.clientTop);

   //        element = element.offsetParent;
   //      }

   //      return {
   //        x: Math.abs(xPosition),
   //        y: Math.abs(yPosition)
   //      };
   // };





    // const getTranslate = (myElement) => {
    //     let style = window.getComputedStyle(myElement);
    //     let matrix = new WebKitCSSMatrix(style.webkitTransform);

    //     return {

    //         translateX: matrix.m41,
    //         translateY: matrix.m42

    //     };
    // };





    // Using canvas api top cut the img up in pieces
    const cutImageUp = () => {
        let imagePieces = [],
            PuzzleColls = tileCount,
            PuzzleRows = tileCount,
            imgPieceWidth = boardSize/tileCount,//img width should be equal to picture width / PuzzleColls
            imgPieceHeigth = boardSize/tileCount,//img height should be equal to picture width / PuzzleRows
            canvas,
            context,
            yPosition,
            xPosition;

        /*TODO:
            - Rename loop variables
            - using map instead of for loops (and remove variables x and y)
        */

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

function increasePosition(check){
    if(increase === true && position < boardSize){

        position += boardSize/tileCount;

    }else{
        position = boardSize/tileCount;

    }
    return position;
}

//     const incrementY = (function(n) {
//   return function() {

//     if(n < boardSize){
//         n += boardSize/tileCount;

//         // console.log(boardSize/tileCount);
//     }else{
//         n = n;

//     }
//     // console.log(n)
//     return n;
//   };
// }(0));



    const imgPosition = (imgObects, positionNumbers) => {
        let allPuzzlePieces = Array.prototype.slice.call(document.querySelectorAll('.pieces'));
        let images,
            positionY = 0,
            index = 0,
            ix = 0;
            let size =0;


            boardParts = new Array('hello');


        const placeImages = () => {


        };

            for (let i = 0; i < tileCount; ++i) {


                boardParts[i] = new Array(tileCount);
// check to use if images can move or not
                for (let j = 0; j < tileCount; ++j) {
                    boardParts[i][j] = new Object;
                        size = boardSize/tileCount;
                        // position

                    if(position === boardSize && positionY !== boardSize){
                        positionY += boardSize/tileCount;
                    }



                    increase = true;

                    boardParts[i][j].x = increasePosition() - size;
                    boardParts[i][j].y = positionY;


                    // boardParts[i][j].position = 0;
                    // var x = boardParts[i][j].x;
                    // var y = boardParts[i][j].y;

                    placeImages(position);
                    // console.log(position > boardSize/tileCount ,position < boardSize,  position ,boardSize)
            allPuzzlePieces[index].style.transform = `translate(${boardParts[i][j].x}px, ${boardParts[i][j].y}px)`;
                index++;
            // console.log(allPuzzlePieces.length);
                }
            }
            emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
            emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
            // emptyLoc.position =
            // empty start altijd met 00
            // console.log(emptyLoc.y, emptyLoc.x);

            solved = false;
            increase = false;
            positionY = boardSize/tileCount;
            position = 0;


            // images = imgObects.pop();

        //every puzzle piece is placed in differend order
        // return allPuzzlePieces.map((img) => {

        //     index++;
        // });
      };




    const setBackgroundImage = (imgURL) => {

        let allPuzzlePieces = [],
            li;

        imgURL.map((img, i) => {
            li = document.createElement('li');


            li.setAttribute('class',`piece-${i} pieces`);

            puzzleBackground.appendChild(li);

            li.style.backgroundImage = 'url('+img+')';
            li.style.backgroundRepeat = 'no-repeat';
            li.style.backgroundSize = 'cover';
            li.style.height =  `${boardSize/tileCount}px`;
            li.style.width= `${boardSize/tileCount}px`;

            allPuzzlePieces.push(li);


        });

        return (

            // imgPosition(allPuzzlePieces, positionCombinations()),
            allPuzzlePieces.length = 0


            );
    };





    // const shuffleImages = (data) => {

    //     let arrayLength = data.length, t, i;

    //     //TODO: make sure the puzzle never solves from the start
    //     // While there remain elements to shuffle…
    //     while (arrayLength) {

    //         // Pick a remaining element…
    //         i = Math.floor(Math.random() * arrayLength--);

    //         // And swap it with the current element.
    //         dataLength = data[arrayLength];

    //         data[arrayLength] = data[i];

    //         data[i] = dataLength;
    //     }

    //   return data;
    // };





    const moveImage = (element) => {

        // let imagestyle,conditionFilter1,conditionFilter2,
        //     currentPositionY = Number(getTranslate(element).translateY),
        //     currentPositionX = Number(getTranslate(element).translateX);

        // const move = (img) => {

        //     conditionFilter1 = img.filter((puzzlePieces) => {

        //           return getPosition(element).y !== getPosition(puzzlePieces).y && getPosition(element).x !== getPosition(puzzlePieces).x;
        //     });

        //     conditionFilter2 = img.filter((puzzlePieces) => {

        //           return getPosition(element).y === getPosition(puzzlePieces).y && getPosition(element).x !== getPosition(puzzlePieces).x;
        //     });


        //   if(getPosition(element).x > getPosition(conditionFilter1[0]).x && conditionFilter2.length === 0) {

        //           return element.style.transform = `translate(${minPosition}px,${currentPositionY}px`;

        //   } else if (getPosition(element).x < getPosition(conditionFilter1[0]).x && conditionFilter2.length === 0){

        //           return element.style.transform = `translate(${maxPosition}px,${currentPositionY}px)`;

        //     }else if (getPosition(element).x < getPosition(conditionFilter1[0]).x && conditionFilter2.length > 0) {


        //          if (currentPositionY >= maxPosition ) {

        //                  return element.style.transform = `translate(${minPosition}px,${currentPositionX}px)`;
        //          } else {

        //               return element.style.transform = `translate(${currentPositionX}px,${maxPosition}px)`;
        //          }

        //     }else if(conditionFilter2.length > 0 && conditionFilter1.length > 0){

        //         if (currentPositionY >= maxPosition) {

        //               return element.style.transform = `translate(${maxPosition}px,${minPosition}px)`;

        //          } else {

        //               return element.style.transform = `translate(${maxPosition}px,${maxPosition}px)`;
        //          }
        //     }
        // };

        return move(allPuzzlePieces);
    };





    const moveObjects = (e) => {
        if (e.target !== e.currentTarget) {
                  moveImage(e.target);
        }
        e.stopPropagation();
    };





    init();
}
