var anImageElement2 = document.querySelector('.puzzle-background');
let image = new Image();
image.onload = cutImageUp;
image.src = './../img/monks.jpg';

    var positions = [0, 164];

    let numbers = [];

function cutImageUp() {
    let imagePieces = [];
    let widthOfOnePiece = 250;
    let heightOfOnePiece = 250;
    let numColsToCut = 2;
    let numRowsToCut = 2;
    let index = 0;
    let allPositions = positions.length;
    let i, j;


// create all posible combinations
    for(i = 0; i < allPositions; i++){
        for(j = 0; j < allPositions; j++){
        // array with all posible positions
         numbers.push([positions[i], positions[j]]);
        }
    }


// slice img into 4 pieces
    for(let x = 0; x < numColsToCut; ++x) {
        for(let y = 0; y < numRowsToCut; ++y) {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }


    let puzzlePiece1 = document.querySelectorAll('.pieces');

    var allPuzzlePieces = Array.prototype.slice.call(puzzlePiece1);

    allPuzzlePieces.map(function (puzzlePiece, i) {
        puzzlePiece.style.backgroundImage = 'url('+imagePieces[i]+')';
        puzzlePiece.style.backgroundRepeat = 'no-repeat';
        puzzlePiece.style.backgroundSize = 'cover';

        ImgPosition(puzzlePiece);

    });
     // randomly place images



      function ImgPosition(imgObj) {
        let imagestyle = imgObj.style;


        // math random is messing with array data!!
       var left = numbers[Math.floor(Math.random() * numbers.length)];
       var top = numbers[Math.floor(Math.random() * numbers.length)];

          // var left = Math.floor(Math.random() * ((anImageElement2.offsetWidth - 1) - imgObj.offsetWidth));

          // var top = Math.floor(Math.random() * ((anImageElement2.offsetHeight - 1) - imgObj.offsetHeight));
          // var imagestyle = imgObj.style;
          // imagestyle.position = "absolute";

          console.log(left, numbers);



        //every puzzle piece is placed in differend order
        imagestyle.position = "absolute";
        imagestyle.top = numbers[index][0]+'px';
        imagestyle.left = numbers[index][1]+'px';


        index++;

      }

}
