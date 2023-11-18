const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for (let i = 0; i < collisionsJson.length; i += 70) {
  collisionsMap.push(collisionsJson.slice(i, 70 + i));
};

const contactMap = []
for (let i = 0; i < contactJson.length; i += 70) {
  contactMap.push(contactJson.slice(i, 70 + i));
};

const frontieres = [];
const compense = {
  x:-65,
  y: -710
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1334)
    frontieres.push(new Frontiere({ 
      position: {
        x: j * Frontiere.width + compense.x,
        y: i * Frontiere.height + compense.y
      },
    }));
  });
});

const contact = [];

contactMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1134)
    contact.push(new Frontiere({ 
      position: {
        x: j * Frontiere.width + compense.x,
        y: i * Frontiere.height + compense.y
      },
    }));
  });
});

console.log(contact);

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
  },
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

const bouger = [background, ...frontieres, arrierePlan, ...contact];

function limiteCollision({limite1, limite2}) {
  return (
    limite1.position.x + limite1.width >= limite2.position.x && 
    limite1.position.x <= limite2.position.x + limite2.width &&
    limite1.position.y <= limite2.position.y + limite2.height &&
    limite1.position.y + limite1.height >= limite2.position.y)
};

const cv ={
  chargement: false
};


function animationJoueur() {
  const animationId = window.requestAnimationFrame(animationJoueur);
  console.log(animationId);
  background.draw();

  frontieres.forEach(frontiere => {
    frontiere.draw();
  })
  contact.forEach(contactCv => {
    contactCv.draw();
  })

  joueur.draw();
  arrierePlan.draw();

  
  let mouvement = true;
  joueur.mouvement = false;

  if(cv.chargement) return;

//  ----------  Activation de la zone de contact pour CV----------  //
  if (touche.z.press || touche.s.press || touche.q.press || touche.d.press) {
    for (let i = 0; i < contact.length; i++) {
      const contactCv = contact[i];
      const chevauchement = 
        (Math.min(joueur.position.x + joueur.width, contactCv.position.x + contactCv.width) 
        -
        Math.max(joueur.position.x, contactCv.position.x))
        *
        (Math.min(joueur.position.y + joueur.height, contactCv.position.y + contactCv.height)
        -
        Math.max(joueur.position.y, contactCv.position.y))
      if (
        limiteCollision({
          limite1: joueur,
          limite2: contactCv
        }) &&
        chevauchement > joueur.width * joueur.height /2
      )
        {
        console.log("chargement contact");

        // desactivation animation cv
        window.cancelAnimationFrame(animationId)

        cv.chargement = true
        gsap.to("#chevauchement", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#chevauchement", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activation anamation cv
                animationCv()
                window.open("indexCv.html");  
                gsap.to("#chevauchement", {
                  opacity: 0,
                  duration: 0.4,
                })
              }
            })
          }
        })
        break;
      }
    };
  }

  //  ----------  Activation des frontieres  ----------  //
  
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
    };

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.y += 3
    })  
  }
  else if (touche.q.press && derniereTouche === 'q') {
    joueur.mouvement = true;
    joueur.carteImage = joueur.bougerJoueurs.left;

    for (let i = 0; i < frontieres.length; i++) {
      const frontiere = frontieres[i];
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
        mouvement = false;
        break;
      }
    }

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.x += 3})
  }
  else if (touche.d.press && derniereTouche === 'd') {
    joueur.mouvement = true;
    joueur.carteImage = joueur.bougerJoueurs.right;

    for (let i = 0; i < frontieres.length; i++) {
      const frontiere = frontieres[i];
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
        mouvement = false;
        break;
      }
    };

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.x -= 3})
  }
  else if (touche.s.press && derniereTouche === 's') {
    joueur.mouvement = true;
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
      mouvement = false;
        break;
      }
    };

    if (mouvement)
      bouger.forEach((bouge) => {
        bouge.position.y -= 3})
  }
};

animationJoueur();

const chargementCvImage = new Image();
chargementCvImage.src = "./app/images/chargementCv.png";

const chargementCv = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementCvImage
});

let animationId;

function animationCv() {
  animationId = window.requestAnimationFrame(animationCv);
  chargementCv.draw();
  // window.open("indexCv.html");
  console.log("animation du cv");
};

// ----- Recuperation bouton retour ----- //

document.querySelectorAll("button").forEach(button=> {
  button.addEventListener("click", () => {
    console.log("click");
    gsap.to("#chevauchement", {
      opacity: 1,
      repeat: 3,
      yoyo: true,
      duration: 0.4,
      onComplete() {
        gsap.to("#chevauchement", {
          opacity: 1,
          duration: 0.4,
          onComplete() {
            open("index.html");
            document.querySelector(".retourJeu").style.display = "none";
            gsap.to("#chevauchement", {
              opacity: 0,        
            })
          }
        })
      }
    })
  })
});


