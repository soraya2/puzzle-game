{
    // const anImageElement2 = document.querySelector('.puzzle-background');
    const image = new Image();
    image.onload = cutImageUp;
    image.src = './../img/monks.jpg';

    let positions = [0, 164];

    let numbers = [];
    // Using canvas api top cut the img up in pieces
    function cutImageUp() {
        let imagePieces = [];
        let imgPieceWidth = 250;
        let imgPieceHeigth = 250;
        let PuzzleColls = 2;
        let PuzzleRows = 2;
        let index = 0;
        let allPositions = positions.length;
        let i, j;

    // create all posible combinations
        for(i = 0; i < allPositions; i++){
            for(j = 0; j < allPositions; j++){
            // array with all posible positions
             numbers.push({top: positions[i], left: positions[j]});
            }
        }

        // slice img into 4 pieces 2 rows and 2 collumns

        //TODO: rename loop variables
        for(let x = 0; x < PuzzleColls; ++x) {
            for(let y = 0; y < PuzzleRows; ++y) {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = imgPieceWidth;
                canvas.height = imgPieceHeigth;
                context.drawImage(image, x * imgPieceWidth, y * imgPieceHeigth, imgPieceWidth, imgPieceHeigth, 0, 0, canvas.width, canvas.height);
                imagePieces.push(canvas.toDataURL());
            }
        }

         // randomly place images

        function ImgPosition(imgObects) {

        let position = shuffle(positionNumbers);

            //every puzzle piece is placed in differend order
            imgObects.map(function (img) {
        let imagestyle = img.style;
                imagestyle.position = "absolute";
                imagestyle.top = position[index].top+'px';
                imagestyle.left = position[index].left+'px';

                index++;
            });
          }

        setBackgroundImage();
    }

    function setBackgroundImage() {

        let puzzlePiece1 = document.querySelectorAll('.pieces');
        let allPuzzlePieces = Array.prototype.slice.call(puzzlePiece1);

        ImgPosition(allPuzzlePieces);

        allPuzzlePieces.map(function (puzzlePiece, i) {
            puzzlePiece.style.backgroundImage = 'url('+imagePieces[i]+')';
            puzzlePiece.style.backgroundRepeat = 'no-repeat';
            puzzlePiece.style.backgroundSize = 'cover';

        });
    }

    function shuffle (data) {

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
    }



}
