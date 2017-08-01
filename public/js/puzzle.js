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
    let n = positions.length;
    let i, j;

    for(i = 0; i < n; i++){
        for(j = 0; j < n; j++){

         numbers.push([positions[i], positions[j]]);
            // console.log(positions[i] + ", " +  positions[j]);
            // console.log(numbers);
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


     for (let i = 0; i < imagePieces.length; i++) {

        let puzzlePiece1 = document.querySelectorAll('.pieces')[i];
        puzzlePiece1.style.backgroundImage = 'url('+imagePieces[i]+')';
        puzzlePiece1.style.backgroundRepeat = 'no-repeat';
        puzzlePiece1.style.backgroundSize = 'cover';

        ImgRandomPosition(document.querySelectorAll('.pieces')[i]);

     }
     // randomly place images

// array with all posible positions

      function ImgRandomPosition(imgObj) {

       // console.log(numbers);

       //// random waarde uit the array probleem (het random nummer is niet altijd uniek waardoor je to dubbele posities krijgt)
       // var left = numbers[Math.floor(Math.random() * numbers.length)];
       // var top = numbers[Math.floor(Math.random() * numbers.length)];
       // console.log(left[0]);
          // var left = Math.floor(Math.random() * ((anImageElement2.offsetWidth - 1) - imgObj.offsetWidth));

          // var top = Math.floor(Math.random() * ((anImageElement2.offsetHeight - 1) - imgObj.offsetHeight));
          var imagestyle = imgObj.style;
          imagestyle.position = "absolute";


           // numbers[i]
           var j = 0;
           // var test = numbers[i].length;

           for (var j = 0; j < numbers.length; j++) {
              imagestyle.top = numbers[index][j]+'px';
              imagestyle.left = numbers[index][j]+'px';

           console.log(index ,j);
           }
           console.log(index);

        index++;

          // console.log(left,top);

      }

}
