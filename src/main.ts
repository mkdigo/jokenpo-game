import { Game } from './game/main';

const gameContainer = document.querySelector('main#game');

if (gameContainer) {
  const game = new Game(gameContainer);
  game.execute();
}
