//  ----------  Mise en place des touches du joueur  ----------  //

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
