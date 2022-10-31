const path = require('path');
const fs = require('fs');

const categories = require('../src/game/data/categories.json');
const platforms = require('../src/game/data/platforms.json');
const weapons = require('../src/game/data/weapons.json');

const game = {
  categories,
  platforms,
  weapons,
};

fs.writeFileSync(
  path.join(__dirname, '../src/game/data/game.json'),
  JSON.stringify(game, null, 2),
  { encoding: 'utf8', flag: 'w+' },
);

console.log('game.json generated.');
