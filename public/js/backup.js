{
    const image = new Image();
    let index2 = 30;
    let allPuzzlePieces = Array.prototype.slice.call(document.querySelectorAll('.pieces'));
    let maxPosition = 164;
    // allPuzzlePieces[0].getBoundingClientRect().width + Number(window.getComputedStyle(allPuzzlePieces[0], null).margin.split('px')[0])
    let minPosition = 0;
    const puzzleBackground = document.querySelector(".puzzle-background");

    const init = () => {
        puzzleBackground.addEventListener("click", moveObjects, false);
        image.src = './../img/monks.jpg';
        image.onload = cutImageUp;

    };

    // Calculate all posible positions
    const positionCombinations = () => {
        let positionNumbers = [],
            positions = [minPosition, maxPosition],
            allPositions = positions.length,
            i,
            j;

        for(i = 0; i < allPositions; i++){
            for(j = 0; j < allPositions; j++){
            // array with all posible positions
             positionNumbers.push({top: positions[i], left: positions[j]});
            }
        }

        return shuffleImages(positionNumbers);
    };

    const getPosition = (element) => {
        let xPosition = 0;
        let yPosition = 0;

        if(element){

          xPosition +=  (Math.round(element.getBoundingClientRect().left) - element.scrollLeft + element.clientLeft);
          yPosition += (Math.round(element.getBoundingClientRect().top) - element.scrollTop + element.clientTop);

          element = element.offsetParent;
        }

        return {
          x: Math.abs(xPosition),
          y: Math.abs(yPosition)
        };
   };

    const getTranslate = (myElement) => {
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
            PuzzleColls = 2,
            PuzzleRows = 2,
            imgPieceWidth = 250,//img width should be equal to picture width / PuzzleColls
            imgPieceHeigth = 250,//img height should be equal to picture width / PuzzleRows
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



    const imgPosition = (imgObects, positionNumbers) => {
        let puzzlePiece1 = document.querySelectorAll('.pieces'),
            allPuzzlePieces = Array.prototype.slice.call(puzzlePiece1),
            imagestyle,
            index = 0;
        //every puzzle piece is placed in differend order
        return imgObects.map((img) => {
            imagestyle = img.style;
            imagestyle.transform = `translate(${positionNumbers[index].left}px, ${positionNumbers[index].top}px)`;

            index++;
        });
      };

    const setBackgroundImage = (imgURL) => {

        // let allPuzzlePieces = Array.prototype.slice.call(document.querySelectorAll('.pieces'));

        imgURL.map((img, i) => {
            let li = document.createElement('li');

            li.setAttribute('class',`piece-${i} pieces`);

            puzzleBackground.appendChild(li);

            li.style.backgroundImage = 'url('+img+')';
            li.style.backgroundRepeat = 'no-repeat';
            li.style.backgroundSize = 'cover';

        });

        return imgPosition(allPuzzlePieces, positionCombinations());
    };

    const shuffleImages = (data) => {

        let arrayLength = data.length, t, i;

        //TODO: make sure the puzzle never solves from the start
        // While there remain elements to shuffle…
        while (arrayLength) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * arrayLength--);

            // And swap it with the current element.
            dataLength = data[arrayLength];

            data[arrayLength] = data[i];

            data[i] = dataLength;
        }

      return data;
    };

    const moveImage = (element) => {

        let imagestyle,conditionFilter1,conditionFilter2,
            currentPositionY = Number(getTranslate(element).translateY),
            currentPositionX = Number(getTranslate(element).translateX);

        const move = (img) => {

            conditionFilter1 = img.filter((puzzlePieces) => {

                  return getPosition(element).y !== getPosition(puzzlePieces).y && getPosition(element).x !== getPosition(puzzlePieces).x;
            });

            conditionFilter2 = img.filter((puzzlePieces) => {

                  return getPosition(element).y === getPosition(puzzlePieces).y && getPosition(element).x !== getPosition(puzzlePieces).x;
            });


          if(getPosition(element).x > getPosition(conditionFilter1[0]).x && conditionFilter2.length === 0) {

                  return element.style.transform = `translate(${minPosition}px,${currentPositionY}px`;

          } else if (getPosition(element).x < getPosition(conditionFilter1[0]).x && conditionFilter2.length === 0){

                  return element.style.transform = `translate(${maxPosition}px,${currentPositionY}px)`;

            }else if (getPosition(element).x < getPosition(conditionFilter1[0]).x && conditionFilter2.length > 0) {


                 if (currentPositionY >= maxPosition ) {

                         return element.style.transform = `translate(${minPosition}px,${currentPositionX}px)`;
                 } else {

                      return element.style.transform = `translate(${currentPositionX}px,${maxPosition}px)`;
                 }

            }else if(conditionFilter2.length > 0 && conditionFilter1.length > 0){

                if (currentPositionY >= maxPosition) {

                      return element.style.transform = `translate(${maxPosition}px,${minPosition}px)`;

                 } else {

                      return element.style.transform = `translate(${maxPosition}px,${maxPosition}px)`;
                 }
            }
        };

        return move(allPuzzlePieces);
    };

    const moveObjects = (e) => {
        if (e.target !== e.currentTarget) {
                  moveImage(e.target);
        }
        e.stopPropagation();
    };

    function renderProductList(element, index, arr) {
        let li = document.createElement('li');
        li.setAttribute('class','item');

        ul.appendChild(li);


        // t = document.createTextNode(element);

        return li;
    }

    init();
}





                boardParts[i][j].xLoc = (tileCount - 1) - i;
                    boardParts[i][j].yLoc = (tileCount - 1) - j;




    // const increasePosition4 = (ix) => {

    //   if(ix > 0){
    //       if( positionD <= 250 ) {


    //         positionD+= tileSize;


    //     }else{

    //         positionD = 0;
    //         if(positionXD < boardSize){
    //             positionXD+=tileSize;
    //         }
    //     }

    //   }


    //   return correctAnswers.push({x: positionXD, y: positionD, elementNumber: ix});


    // };







    // function compareAnswers(array1, array2) {

    //   // This block will make the array of indexed that array b contains a elements
    //   let compareArrays = array1.filter(function(value, index, obj) {

    //        let index2 = array2.findIndex( function (element) {

    //               return value.x=== element.x && value.y === element.y && value.elmentNumber === element.elmentNumber;
    //        });

    //     return index2 > -1;

    //   });

    //   return (compareArrays.length !== array1.length) ?  'not equal' :  'equal';
    // }
const checkSolved = (currentElement) => {
  let flag = true;
    currentElement.map((piece)=> {


    // allPuzzlePieces[index].style.transform = `translate(${boardParts[i][j].x}px, ${boardParts[i][j].y}px)`;
        // console.log(getTransformValue(piece));

    });

  // solved = flag;
    // console.log(solved);

};



    let boardSize,
        boardParts,
        allPuzzlePieces,
        tileCount = Number(scale.value),
        tileSize,
        increase = false,
        position = 0;
        clickLoc = new Object(),    // current element
        clickLoc.x = 0;
        clickLoc.y = 0;
        emptyLoc = new Object(),    // empty spot where the img can go
        emptyLoc.x = 0,
        emptyLoc.y = 0,
        solved = false,
        correctAnswers=[];
        let positionD = 0,
            positionXD = 0;


    // const increasePosition4 = (ix) => {

    //   if(ix > 0){
    //       if( positionD <= 250 ) {


    //         positionD+= tileSize;


    //     }else{

    //         positionD = 0;
    //         if(positionXD < boardSize){
    //             positionXD+=tileSize;
    //         }
    //     }

    //   }


    //   return correctAnswers.push({x: positionXD, y: positionD, elementNumber: ix});


    // };



    const setTilePosition = (boardParts) =>{

        for (var i = allPuzzlePieces.length - 1; i >= 0; i--) {

                allPuzzlePieces[i].style.transform = `translate(${boardParts.x}px, ${boardParts.y}px)`;
                createAnswers(i);
        }


    };


    const createAnswers = (amount) => {

    if(amount > 0 ){
        if( positionD <= (boardSize/2) && tileCount > 2 ) {

            positionD+= tileSize;

        }else{

                positionD = 0;
                console.log(tileSize === (boardSize/2) , positionXD ,(boardSize/2) , amount ,(allPuzzlePieces.length/2))

                if(positionXD <= (boardSize/2) && tileSize !== (boardSize/2)){

                    positionXD+=tileSize;

                }else if(tileSize === (boardSize/2)  && positionXD <= (boardSize/2) && amount < (allPuzzlePieces.length/2)){
                     positionXD+=tileSize;



                }else if (amount >= (allPuzzlePieces.length/2)){
                    if(positionXD ===0 ){
                        positionXD+=tileSize;
                    }else{
                     positionXD = 0;

                    }

                }
            }
        }

        correctAnswers.push({x: positionXD, y: positionD, elementNumber: amount});

    };



    const increasePositionY = ()=>{
                if(positionX === boardSize && positionY !== boardSize){
            return positionY += boardSize/tileCount;
        }
    };


const checkSolved = () => {
  let flag = true;



    allPuzzlePieces.map((piece, i)=> {
    getTransformValue(piece);

  console.log(getTransformValue(piece), i, correctAnswers);

    });
