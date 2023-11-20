class BougerJoueur {
  constructor({ position, rapidité, carteImage, cadre = {max : 1}, bougerJoueurs }) {
    this.position = position
    this.carteImage = carteImage
    this.cadre = {...cadre, value: 0, ecoule: 0}
    
    this.carteImage.onload = () => {
    this.width = this.carteImage.width / this.cadre.max
    this.height = this.carteImage.height
    }
    this.mouvement = false
    this.bougerJoueurs = bougerJoueurs
  }

  draw() {
    context.drawImage(
      this.carteImage,
      this.cadre.value * this.width,
      0,
      this.carteImage.width / this.cadre.max,
      this.carteImage.height,
      this.position.x,
      this.position.y,
      this.carteImage.width / this.cadre.max,
      this.carteImage.height
    )

    if (!this.mouvement) return

    if (this.cadre.max > 1) {
      this.cadre.ecoule++
    }

    if (this.cadre.ecoule % 10 === 0) {
      if (this.cadre.value < this.cadre.max -1) this.cadre.value++
      else this.cadre.value = 0
    }
  }
};

class Frontiere {
  static width = 48;
  static height = 48;
  constructor({position}) {
    this.position = position,
    this.width = 48,
    this.height = 48
  }
  draw() {
    context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
};