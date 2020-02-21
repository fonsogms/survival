/* let zombie1S=[]
let zombie1W=[]
let zombie1E=[] */
declareResources = game => {
  game.zombie1N = [];
  game.zombie1S = [];
  game.zombie1W = [];
  game.zombie1E = [];
  for (let i = 1; i <= 3; i++) {
    game.zombie1N.push(loadImage(`assets/zombies/zombie1N${i}.png`));
    game.zombie1S.push(loadImage(`assets/zombies/zombie1S${i}.png`));
    game.zombie1W.push(loadImage(`assets/zombies/zombie1W${i}.png`));
    game.zombie1E.push(loadImage(`assets/zombies/zombie1E${i}.png`));
  }
};
