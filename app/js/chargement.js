//  ----------  Mise en place du chargement du CV  ----------  //

const chargementCvImage = new Image();
chargementCvImage.src = "./app/images/chargementCv.webp";

const chargementCv = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementCvImage
});

let animationIdCv;

function animationCv() {
  document.querySelector("#retourJeu").style.display = "block";
  animationIdCv = window.requestAnimationFrame(animationCv);
  chargementCv.draw();
  console.log("animation du cv");
};

//  ----------  Mise en place du chargement des Sites Internet  ----------  //

const chargementSiteImage = new Image();
chargementSiteImage.src = "./app/images/chargementSiteInternet.webp";

const chargementSite = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementSiteImage
});

let animationIdSite;

function animationSite() {
  document.querySelector("#retourJeu").style.display = "block";
  animationIdSite = window.requestAnimationFrame(animationSite);
  chargementSite.draw();
  console.log("animation du Site");
};

//  ----------  Mise en place du chargement des Commentaires du Jyry  ----------  //

const chargementCommentairesImage = new Image();
chargementCommentairesImage.src = "./app/images/commentaireExam.webp";

const chargementCommentaires = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementCommentairesImage
});

let animationIdCommentaires;

function animationCommentaires() {
  document.querySelector("#retourJeu").style.display = "block";
  animationIdCommentaires = window.requestAnimationFrame(animationCommentaires);
  chargementCommentaires.draw();
  console.log("animation des Commentaires");
};

//  ----------  Mise en place du chargement du Diplôme  ----------  //

const chargementDiplomeImage = new Image();
chargementDiplomeImage.src = "./app/images/chargementDiplome.webp";

const chargementDiplome = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementDiplomeImage
});

let animationIdDiplome;

function animationDiplome() {
  document.querySelector("#retourJeu").style.display = "block";
  animationIdDiplome = window.requestAnimationFrame(animationDiplome);
  chargementDiplome.draw();
  console.log("animation du Diplome");
};

//  ----------  Mise en place du chargement Linkedin  ----------  //

const chargementLinkedinImage = new Image();
chargementLinkedinImage.src = "./app/images/pageBleu.png";

const chargementLinkedin = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementLinkedinImage
});

let animationIdLinkedin;

function animationLinkedin() {
  document.querySelector("#retourJeu").style.display = "block";
  animationIdLinkedin = window.requestAnimationFrame(animationLinkedin);
  chargementLinkedin.draw();
  console.log("animation de Linkedin");
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
        cancelAnimationFrame(animationIdCv);   
        cancelAnimationFrame(animationIdSite);
        cancelAnimationFrame(animationIdCommentaires);
        cancelAnimationFrame(animationIdDiplome);
        cancelAnimationFrame(animationIdLinkedin);
        animationJoueur();
        document.querySelector("#retourJeu").style.display = 'none'
        gsap.to("#chevauchement", {
          opacity: 0,
          duration: 0.4,
        })

        cv.chargement = false;
      }  
    })
  })
});
