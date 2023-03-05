const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = 'app/images/PortfolioGameMap.png';

const joueurDownImage = new Image();
joueurDownImage.src = 'app/images/JoueurDown.png';

image.onload = () => {
  context.drawImage(image, -65, -670);
  context.drawImage(joueurDownImage,
    0,
    0,
    joueurDownImage.width / 4,
    joueurDownImage.height,
    canvas.width / 2 - (joueurDownImage.width / 4) / 2, 
    canvas.height / 2 - joueurDownImage.height / 2,
    joueurDownImage.width / 4,
    joueurDownImage.height
  );
};
console.log(joueurDownImage)