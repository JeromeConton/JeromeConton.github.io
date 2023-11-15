const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for (let i=0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i,70 + i))
};

class Frontiere {
  static width = 48
  static height = 48
  constructor({position}) {
    this.position = position
    this.width = 48
    this.height = 48
  }
  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
};

const frontieres = []
const compense = {
  x:-65,
  y: -670
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1334)
    frontieres.push(new Frontiere({ 
      position: {
        x: j * Frontiere.width + compense.x,
        y: i * Frontiere.height + compense.y
      }
    }))
  })
});

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const carteImage = new Image();
carteImage.src = 'app/images/PortfolioGameMap.png';

const joueurDownImage = new Image();
joueurDownImage.src ='app/images/JoueurDown.png';

class BougerJoueur {
  constructor({ position, rapidité, carteImage, cadre = {max : 1} }) {
    this.position = position;
    this.carteImage = carteImage;
    this.cadre = cadre
  };

  draw() {
    // context.drawImage(this.carteImage, this.position.x, this.position.y);
    context.drawImage(
      this.carteImage,
      0,
      0,
      this.carteImage.width / this.cadre.max,
      this.carteImage.height,
      this.position.x,
      this.position.y,
      this.carteImage.width / this.cadre.max,
      this.carteImage.height
    );
  };
};

const joueur = new BougerJoueur({
  position: {
    x: canvas.width / 2 - 192 / 4/ 2,
    y: canvas.height / 2 - 68 / 2
  },
  carteImagemage: joueurDownImage
})

const background = new BougerJoueur({
  position : {x: compense.x, y: compense.y},
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

const testFrontiere = new Frontiere({
  position: {
    x: 400,
    y: 400
  }
});

const bouger = [background, testFrontiere]

function animationJoueur() {
  window.requestAnimationFrame(animationJoueur);
  background.draw();
  // frontieres.forEach(frontiere => {
  //   frontiere.draw()
  // }),
  testFrontiere.draw()

  joueur.draw()

  // if (joueur.position.x + joueur.width)


  if (touche.z.press && derniereTouche === 'z') {
    bouger.forEach((bouge) => {
      bouge.position.y += 3
    })
}
  else if (touche.q.press && derniereTouche === 'q') {
    bouger.forEach((bouge) => {
    bouge.position.x += 3})
  }
  else if (touche.d.press && derniereTouche === 'd') {
    bouger.forEach((bouge) => {
    bouge.position.x -= 3})
  }
  else if (touche.s.press && derniereTouche === 's') {
    bouger.forEach((bouge) => {
    bouge.position.y -= 3})
  }
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
