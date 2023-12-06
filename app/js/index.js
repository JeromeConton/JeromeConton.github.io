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

const app1Map = []
for (let i = 0; i < app1Json.length; i += 70) {
  app1Map.push(app1Json.slice(i, 70 + i));
};

const app2Map = []
for (let i = 0; i < app2Json.length; i += 70) {
  app2Map.push(app2Json.slice(i, 70 + i));
};

const acceuilMap = []
for (let i = 0; i < acceuilJson.length; i += 70) {
  acceuilMap.push(acceuilJson.slice(i, 70 + i));
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

const app1 = [];

app1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1134)
    app1.push(new Frontiere({ 
      position: {
        x: j * Frontiere.width + compense.x,
        y: i * Frontiere.height + compense.y
      },
    }));
  });
});

const app2 = [];

app2Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1334)
    app2.push(new Frontiere({ 
      position: {
        x: j * Frontiere.width + compense.x,
        y: i * Frontiere.height + compense.y
      },
    }));
  });
});

const acceuil = [];

acceuilMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1334)
    acceuil.push(new Frontiere({ 
      position: {
        x: j * Frontiere.width + compense.x,
        y: i * Frontiere.height + compense.y
      },
    }));
  });
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

const bouger = [background, ...frontieres, arrierePlan, ...contact, ...app1, ...app2, ...acceuil];

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

const site1={
  chargement: false
};

const site2={
  chargement: false
};

const retourAcceuil={
  chargement: false
};

function animationJoueur() {
  document.querySelector("#retourJeu").style.display = 'none';
  const animationId = window.requestAnimationFrame(animationJoueur);
  console.log(animationId);
  background.draw();

  frontieres.forEach(frontiere => {
    frontiere.draw();
  })
  contact.forEach(contactCv => {
    contactCv.draw();
  })

  app1.forEach(app1Site => {
    app1Site.draw();
  })

  app2.forEach(app2Site => {
    app2Site.draw();
  })

  acceuil.forEach(acceuilRetour => {
    acceuilRetour.draw();
  })

  joueur.draw();
  arrierePlan.draw();
  
  let mouvement = true;
  joueur.mouvement = false;

  console.log(animationId);
  if(cv.chargement) return;

  if(site1.chargement) return;

  if(site2.chargement) return;

  if(retourAcceuil.chargement) return;

//  ----------  Activation de la zone de contact pour CV----------  //
  if (touche.z.press || touche.s.press || touche.q.press || touche.d.press) {
    for (let i = 0; i < contact.length; i++) {
      const contactCv = contact[i];
      const aireChevauchement = 
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
        aireChevauchement > (joueur.width * joueur.height) /2 && Math.random() < 0.02
      )
        {
        console.log("chargement contact");

        // desactivation boucle animation cv
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
                window.open("./appCv/indexCv.html");  
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

//  ----------  Activation de la zone de contact pour Application 1 ----------  //
if (touche.z.press || touche.s.press || touche.q.press || touche.d.press) {
  for (let i = 0; i < app1.length; i++) {
    const app1Site = app1[i];
    const aireChevauchement = 
      (Math.min(joueur.position.x + joueur.width, app1Site.position.x + app1Site.width) 
      -
      Math.max(joueur.position.x, app1Site.position.x))
      *
      (Math.min(joueur.position.y + joueur.height, app1Site.position.y + app1Site.height)
      -
      Math.max(joueur.position.y, app1Site.position.y))
    if (
      limiteCollision({
        limite1: joueur,
        limite2: app1Site
      }) &&
      aireChevauchement > (joueur.width * joueur.height) /3 && Math.random() < 0.06
    )
      {
      console.log("chargement app1");

      // desactivation boucle animation Application 1
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
              // activation animation Application 1
              animationCv()
              window.open("https://mypartneroutdoor.fr/");  
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

//  ----------  Activation de la zone de contact pour Application 2 ----------  //
if (touche.z.press || touche.s.press || touche.q.press || touche.d.press) {
  for (let i = 0; i < app2.length; i++) {
    const app2Site = app2[i];
    const aireChevauchement = 
      (Math.min(joueur.position.x + joueur.width, app2Site.position.x + app2Site.width) 
      -
      Math.max(joueur.position.x, app2Site.position.x))
      *
      (Math.min(joueur.position.y + joueur.height, app2Site.position.y + app2Site.height)
      -
      Math.max(joueur.position.y, app2Site.position.y))
    if (
      limiteCollision({
        limite1: joueur,
        limite2: app2Site
      }) &&
      aireChevauchement > (joueur.width * joueur.height) /3 && Math.random() < 0.06
    )
      {
      console.log("chargement app2");

      // desactivation boucle animation Application 2
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
              // activation animation Application 2
              animationCv()
              window.open("https://boulangerie-lafabrik.fr/");  
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

//  ----------  Activation de la zone de contact pour retour acceuil ----------  //
if (touche.z.press || touche.s.press || touche.q.press || touche.d.press) {
  for (let i = 0; i < acceuil.length; i++) {
    const acceuilRetour = acceuil[i];
    const aireChevauchement = 
      (Math.min(joueur.position.x + joueur.width, acceuilRetour.position.x + acceuilRetour.width) 
      -
      Math.max(joueur.position.x, acceuilRetour.position.x))
      *
      (Math.min(joueur.position.y + joueur.height, acceuilRetour.position.y + acceuilRetour.height)
      -
      Math.max(joueur.position.y, acceuilRetour.position.y))
    if (
      limiteCollision({
        limite1: joueur,
        limite2: acceuilRetour
      }) &&
      aireChevauchement > (joueur.width * joueur.height) /3 && Math.random() < 0.06
    )
      {
      console.log("chargement app1");

      // desactivation boucle animation retour acceuil
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
              // activation animation retour acceuil
              animationCv()
              window.open("./appCv/indexCv.html");  
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
      const frontiere = frontieres[i];
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
      };
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
      const frontiere = frontieres[i];
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
