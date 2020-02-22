/* let zombie1S=[]
let zombie1W=[]
let zombie1E=[] */
declareResources = game => {
  for (let i = 1; i <= 3; i++) {
    game[`zombie${i}N`] = [];
    game[`zombie${i}S`] = [];
    game[`zombie${i}W`] = [];
    game[`zombie${i}E`] = [];
    for (let j = 1; j <= 3; j++) {
      game[`zombie${i}N`].push(loadImage(`assets/zombies/zombie${i}N${j}.png`));
      game[`zombie${i}S`].push(loadImage(`assets/zombies/zombie${i}S${j}.png`));
      game[`zombie${i}W`].push(loadImage(`assets/zombies/zombie${i}W${j}.png`));
      game[`zombie${i}E`].push(loadImage(`assets/zombies/zombie${i}E${j}.png`));
    }
  }
};
