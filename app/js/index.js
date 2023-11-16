const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for (let i=0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i,70 + i))
};

const frontieres = []
const compense = {
  x:-65,
  y: -710
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1334 & 1085)
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
carteImage.src = "./app/images/PortfolioGameMap.png";

const arrierePlanImage = new Image();
arrierePlanImage.src = "./app/images/PortfolioGameMapArrierePlan.png"

const joueurDownImage = new Image();
joueurDownImage.src ="./app/images/JoueurDown.png";

const joueurUpImage = new Image();
joueurUpImage.src ="./app/images/JoueurUp.png";

const joueurLeftImage = new Image();
joueurLeftImage.src ="./app/images/JoueurLeft.png";

const joueurRightImage = new Image();
joueurRightImage.src ="./app/images/JoueurRight.png";

const joueur = new BougerJoueur({
  position: {
    x: canvas.width / 2 - 192 / 4/ 2,
    y: canvas.height / 2 - 68 / 2
  },
  carteImage: joueurDownImage,
  cadre: {
    max: 4
  },
  bougerJoueurs: {
    up: joueurUpImage,
    left: joueurLeftImage,
    right: joueurRightImage,
    down: joueurDownImage
  }
});

const background = new BougerJoueur({
  position : {
    x: compense.x, 
    y: compense.y
  },
  carteImage: carteImage
});

const arrierePlan = new BougerJoueur({
  position : {
    x: compense.x, 
    y: compense.y
  },
  carteImage: arrierePlanImage
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
  }
};

const bouger = [background, ...frontieres, arrierePlan]

function limiteCollision({limite1, limite2}) {
  return (
    limite1.position.x + limite1.width >= limite2.position.x && 
    limite1.position.x <= limite2.position.x + limite2.width &&
    limite1.position.y <= limite2.position.y + limite2.height &&
    limite1.position.y + limite1.height >= limite2.position.y)
};

function animationJoueur() {
  window.requestAnimationFrame(animationJoueur);
  background.draw();
  frontieres.forEach(frontiere => {
    frontiere.draw()  
  })

  joueur.draw();
  arrierePlan.draw();

  let mouvement = true;
  joueur.mouvement = false;
  
  if (touche.z.press && derniereTouche === 'z') {
    joueur.mouvement = true;
    joueur.carteImage = joueur.bougerJoueurs.up;
    for (let i = 0; i < frontieres.length; i++) {
      const frontiere = frontieres[i]
      if (
        limiteCollision({
          limite1: joueur,
          limite2: {...frontiere, position: {
            x: frontiere.position.x,
            y: frontiere.position.y + 3
          }}
        })
      )
      {
      mouvement = false;
        break;
      }
    }

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.y += 3
    })  
  }
  else if (touche.q.press && derniereTouche === 'q') {
    joueur.mouvement = true
    joueur.carteImage = joueur.bougerJoueurs.left

    for (let i = 0; i < frontieres.length; i++) {
      const frontiere = frontieres[i]
      if (
        limiteCollision({
          limite1: joueur,
          limite2: {...frontiere, position: {
            x: frontiere.position.x +3,
            y: frontiere.position.y
          }}
        })
      )
      {
        mouvement = false
        break;
      }
    }

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.x += 3})
  }
  else if (touche.d.press && derniereTouche === 'd') {
    joueur.mouvement = true
    joueur.carteImage = joueur.bougerJoueurs.right;

    for (let i = 0; i < frontieres.length; i++) {
      const frontiere = frontieres[i]
      if (
        limiteCollision({
          limite1: joueur,
          limite2: {...frontiere, position: {
            x: frontiere.position.x - 3,
            y: frontiere.position.y
          }}
        })
      )
      {
        mouvement = false
        break;
      }
    }

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.x -= 3})
  }
  else if (touche.s.press && derniereTouche === 's') {
    joueur.mouvement = true
    joueur.carteImage = joueur.bougerJoueurs.down;

    for (let i = 0; i < frontieres.length; i++) {
      const frontiere = frontieres[i]
      if (
        limiteCollision({
          limite1: joueur,
          limite2: {...frontiere, position: {
            x: frontiere.position.x,
            y: frontiere.position.y - 3
          }}
        })
      )
      {
      mouvement = false
        break;
      }
    }

    if (mouvement)
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
