const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const carteImage = new Image();
carteImage.src = 'app/images/PortfolioGameMap.png';

const joueurDownImage = new Image();
joueurDownImage.src ='app/images/JoueurDown.png';

class BougerJoueur {
  constructor({ position, velocity, carteImage }) {
    this.position = position;
    this.carteImage = carteImage;
  };

  draw() {
    context.drawImage(this.carteImage, this.position.x, this.position.y);
  };
};

const background = new BougerJoueur({
  position : {x: -65, y: -670},
  carteImage: carteImage,
});

const touche = {
  z: {
    press: false,
  },
  q: {
    press: false,
  },
  s: {
    press: false,
  },
  d: {
    press: false,
  },
};

function animationJoueur() {
  window.requestAnimationFrame(animationJoueur);
  background.draw();
  context.drawImage(
    joueurDownImage,
    0,
    0,
    joueurDownImage.width / 4,
    joueurDownImage.height,
    canvas.width / 2 - joueurDownImage.width / 4 / 2,
    canvas.height / 2 - joueurDownImage.height / 2,
    joueurDownImage.width / 4,
    joueurDownImage.height
  );


  if (touche.z.press && derniereTouche === 'z') {
    background.position.y = background.position.y + 3;
  }
  else if (touche.q.press && derniereTouche === 'q') {
    background.position.x = background.position.x + 3;
  }
  else if (touche.d.press && derniereTouche === 'd') {
    background.position.x = background.position.x - 3;
  }
  else if (touche.s.press && derniereTouche === 's') {
    background.position.y = background.position.y - 3
  };
};
animationJoueur();

let derniereTouche = '';
window.addEventListener('keydown', (even) => {
  switch (even.key) {
    case 'z':
      touche.z.press = true;
      derniereTouche = 'z';
      break;
    case 'q':
      touche.q.press = true;
      derniereTouche = 'q';
      break;

    case 's':
      touche.s.press = true;
      derniereTouche = 's';
      break;

    case 'd':
      touche.d.press = true;
      derniereTouche = 'd';
      break;
  };
});

window.addEventListener('keyup', (even) => {
  switch (even.key) {
    case 'z':
      touche.z.press = false;
      break;
    case 'q':
      touche.q.press = false;
      break;
    case 's':
      touche.s.press = false;
      break;
    case 'd':
      touche.d.press = false;
      break;
  };
});
