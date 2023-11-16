class BougerJoueur {
  constructor({ position, rapidité, carteImage, cadre = {max : 1} }) {
    this.position = position,
    this.carteImage = carteImage,
    this.cadre = cadre,
    
    this.carteImage.onload = () => {
    this.width = this.carteImage.width / this.cadre.max;
    this.height = this.carteImage.height
    }
  };

  draw() {
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
    )
  };
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
    context.fillStyle = 'rgba(255, 0, 0, 0)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
};
