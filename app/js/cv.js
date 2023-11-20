//  ----------  Mise en place du chargement du CV  ----------  //

const chargementCvImage = new Image();
chargementCvImage.src = "./app/images/chargementCv.png";

// document.querySelector("#retourJeu").style.display = 'none'

const chargementCv = new BougerJoueur({
  position: {
    x: 0,
    y: 0
  },
  carteImage: chargementCvImage
});

let animationIdCv;
let renderedSprites;

function animationCv() {
  document.querySelector("#retourJeu").style.display = "block";
  animationIdCv = window.requestAnimationFrame(animationCv);
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
        cancelAnimationFrame(animationIdCv);   
          animationJoueur();
          document.querySelector("#retourJeu").style.display = 'none'
          // cv.chargement = false;
        gsap.to("#chevauchement", {
          opacity: 0,
          duration: 0.4,
        })

       cv.chargement = false;
      }  
    })
  })
});


