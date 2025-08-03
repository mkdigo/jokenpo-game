import type { ElementInterface } from '../ElementInterface';
import { Fight } from '../Fight';
import { Paper } from '../Paper';
import { Player } from '../Player';
import { Rock } from '../Rock';
import { Scissors } from '../Scissors';
import { Sounds } from '../Sounds';

import './score.css';
import './animation.css';
import './handButtons.css';

export class Game {
  private canFight: boolean;
  private sounds: Sounds;
  private fight: Fight;
  private rock: ElementInterface;
  private paper: ElementInterface;
  private scissors: ElementInterface;
  private player: Player;
  private computerPlayer: Player;
  private scoreElement: HTMLDivElement;
  private leftHandContainer: HTMLDivElement;
  private rightHandContainer: HTMLDivElement;

  constructor(private gameContainer: Element) {
    this.canFight = true;
    this.sounds = new Sounds();
    this.rock = new Rock();
    this.paper = new Paper();
    this.scissors = new Scissors();

    this.player = new Player(this.rock);
    this.computerPlayer = new Player(this.rock);
    this.scoreElement = document.createElement('div');

    this.fight = new Fight(this.player, this.computerPlayer);

    this.leftHandContainer = document.createElement('div');
    this.rightHandContainer = document.createElement('div');
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    return button;
  }

  private renderScoreContainer() {
    const section = document.createElement('section');
    section.id = 'score';

    const div = document.createElement('div');
    div.innerText = 'Score:';

    section.appendChild(div);
    section.appendChild(this.scoreElement);

    this.renderScore();

    this.gameContainer.appendChild(section);
  }

  private renderScore() {
    this.scoreElement.innerText = this.player.score.toString();
  }

  private renderAnimationContainer() {
    const section = document.createElement('section');
    section.id = 'animation';

    this.leftHandContainer.appendChild(this.rock.img());
    this.rightHandContainer.appendChild(this.rock.img());

    section.appendChild(this.leftHandContainer);
    section.appendChild(this.rightHandContainer);

    this.gameContainer.appendChild(section);
  }

  private renderHandsButtons() {
    const section = document.createElement('section');
    section.id = 'handButtons';

    const rockButton = this.createButton();
    rockButton.appendChild(this.rock.img());
    const paperButton = this.createButton();
    paperButton.appendChild(this.paper.img());
    const scissorsButton = this.createButton();
    scissorsButton.appendChild(this.scissors.img());

    section.appendChild(rockButton);
    section.appendChild(paperButton);
    section.appendChild(scissorsButton);

    this.gameContainer.appendChild(section);

    rockButton.addEventListener('click', () => {
      if (!this.canFight) return;
      this.player.setHand(this.rock);
      this.fightExecute();
    });

    paperButton.addEventListener('click', () => {
      if (!this.canFight) return;
      this.player.setHand(this.paper);
      this.fightExecute();
    });

    scissorsButton.addEventListener('click', () => {
      if (!this.canFight) return;
      this.player.setHand(this.scissors);
      this.fightExecute();
    });
  }

  private setComputerHand() {
    const random = Math.floor(Math.random() * 3) + 1;
    switch (random) {
      case 1:
        this.computerPlayer.setHand(this.rock);
        break;
      case 2:
        this.computerPlayer.setHand(this.paper);
        break;
      case 3:
        this.computerPlayer.setHand(this.scissors);
        break;
    }
  }

  private fightExecute() {
    this.canFight = false;
    let timeInSeconds: number = 0;

    if (this.fight.lastResult === 'draw') {
      this.sounds.play('aikodesho');
      timeInSeconds = this.sounds.aikodeshoAudioDuration;
    } else {
      this.sounds.play('jankenpon');
      timeInSeconds = this.sounds.jankenponAudioDuration;
    }

    this.setComputerHand();

    const result = this.fight.execute();

    this.leftHandContainer.innerHTML = '';
    this.rightHandContainer.innerHTML = '';
    this.leftHandContainer.appendChild(this.rock.img());
    this.rightHandContainer.appendChild(this.rock.img());
    this.leftHandContainer.classList.add('leftHandAnimation');
    this.rightHandContainer.classList.add('rightHandAnimation');

    this.leftHandContainer.style.setProperty(
      '--duration',
      `${timeInSeconds - 1}s`
    );
    this.rightHandContainer.style.setProperty(
      '--duration',
      `${timeInSeconds - 1}s`
    );

    setTimeout(() => {
      this.leftHandContainer.classList.remove('leftHandAnimation');
      this.rightHandContainer.classList.remove('rightHandAnimation');
      this.leftHandContainer.innerHTML = '';
      this.rightHandContainer.innerHTML = '';
      this.leftHandContainer.appendChild(this.player.hand.img());
      this.rightHandContainer.appendChild(this.computerPlayer.hand.img());

      if (result === 'win') {
        this.renderScore();
        this.sounds.play('win');
      }
      switch (result) {
        case 'win':
          this.renderScore();
          this.sounds.play('win');
          break;
        case 'lose':
          this.sounds.play('lose');
          break;
      }
    }, (timeInSeconds - 1) * 1000);

    setTimeout(() => {
      this.canFight = true;
    }, timeInSeconds * 1000);
  }

  public execute() {
    this.renderScoreContainer();
    this.renderAnimationContainer();
    this.renderHandsButtons();
  }
}
