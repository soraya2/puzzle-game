{
    const image = new Image();
    image.src = './../img/monks.jpg';
    let index2 = 30;

    const init = () => {
        const puzzleBackground = document.querySelector(".puzzle-background");
        puzzleBackground.addEventListener("click", moveObjects, false);
        image.onload = cutImageUp;

    };

    const moveObjects = (e) => {
        if (e.target !== e.currentTarget) {
            index2+=10;
            // console.log(index2);
            // e.target.style.left = index2+'px';

            moveElement( e.target);



        }
        e.stopPropagation();
    };




    // Using canvas api top cut the img up in pieces
    const positionCombinations = () => {
        let positionNumbers = [],
            positions = [0, 164],
            allPositions = positions.length,
            i,
            j;

        for(i = 0; i < allPositions; i++){
            for(j = 0; j < allPositions; j++){
            // array with all posible positions
             positionNumbers.push({top: positions[i], left: positions[j]});
            }
        }

        return shuffle(positionNumbers);
    };

    // Using canvas api top cut the img up in pieces
    const cutImageUp = () => {
        let imagePieces = [],
            imgPieceWidth = 250,
            imgPieceHeigth = 250,
            PuzzleColls = 2,
            PuzzleRows = 2,
            canvas,
            context,
            y,
            x;

        /*TODO:
            - Rename loop variables
            - using map instead of for loops (and remove variables x and y)
        */
        // slice img into 4 pieces 2 rows and 2 collumns
        for(x = 0; x < PuzzleColls; x++) {
            for(y = 0; y < PuzzleRows; y++) {

                canvas = document.createElement('canvas');
                context = canvas.getContext('2d');
                canvas.width = imgPieceWidth;
                canvas.height = imgPieceHeigth;

                context.drawImage(image, x * imgPieceWidth, y * imgPieceHeigth, imgPieceWidth, imgPieceHeigth, 0, 0, canvas.width, canvas.height);

                imagePieces.push(canvas.toDataURL());

            }
        }
        setBackgroundImage(imagePieces);
    };



    const imgPosition = (imgObects, positionNumbers) => {

        let imagestyle,
        index = 0;
        //every puzzle piece is placed in differend order
        return imgObects.map((img) => {
            imagestyle = img.style;

            imagestyle.position = "absolute";
            imagestyle.top = positionNumbers[index].top+'px';
            imagestyle.left = positionNumbers[index].left+'px';

            index++;
        });
      };

    const setBackgroundImage = (imgURL) => {

        let puzzlePiece1 = document.querySelectorAll('.pieces');
        let allPuzzlePieces = Array.prototype.slice.call(puzzlePiece1);

        allPuzzlePieces.map((puzzlePiece, i) => {
            console.log(puzzlePiece)

            puzzlePiece.style.backgroundImage = 'url('+imgURL[i]+')';
            puzzlePiece.style.backgroundRepeat = 'no-repeat';
            puzzlePiece.style.backgroundSize = 'cover';

        });

        return imgPosition(allPuzzlePieces, positionCombinations());
    };


    const shuffle = (data) => {

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

    const moveElement = (element) => {
        let puzzlePiece1 = document.querySelectorAll('.pieces');
        let allPuzzlePieces = Array.prototype.slice.call(puzzlePiece1);
        let puzzleRight1 = element.getBoundingClientRect(),
            puzzleLeft1 = element.getBoundingClientRect(),
            puzzleBottom1 = element.getBoundingClientRect(),
            puzzleTop1 = element.getBoundingClientRect();


        console.log(element.getBoundingClientRect());

            allPuzzlePieces.map((puzzlePiece, i) => {
            let index = i;

                if(index < allPuzzlePieces.length){

                let puzzleRight2 = allPuzzlePieces[index].getBoundingClientRect(),
                    puzzleLeft2 = allPuzzlePieces[index].getBoundingClientRect(),
                    puzzleBottom2 = allPuzzlePieces[index].getBoundingClientRect(),
                    puzzleTop2 = allPuzzlePieces[index].getBoundingClientRect();
                            console.log(element.offsetTop);

                    if (allPuzzlePieces[index].classList[0] !== element.classList[0]) {
                        if (!puzzleRight1.right < puzzleRight2.left + puzzleRight2.width &&
                           !puzzleRight1.right + puzzleRight1.width > puzzleRight2.left &&
                           !puzzleRight1.bottom < puzzleRight2.top + puzzleRight2.height &&
                           !puzzleRight1.height + puzzleRight1.bottom > puzzleRight2.top) {
                            // collision detected!
                        console.log('collision');
                        }else{
                        }
                        // console.log(allPuzzlePieces[i].getBoundingClientRect(), i);
                    }
                }
            });

    };



    init();
}
