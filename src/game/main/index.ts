import type { TWeaponName, WeaponInterface } from '../WeaponInterface';
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
  private rock: WeaponInterface;
  private paper: WeaponInterface;
  private scissors: WeaponInterface;
  private player: Player;
  private computerPlayer: Player;
  private playerScoreElement: HTMLSpanElement;
  private computerScoreElement: HTMLSpanElement;
  private playerWeaponContainer: HTMLDivElement;
  private computerWeaponContainer: HTMLDivElement;

  constructor(private gameContainer: Element) {
    this.canFight = true;
    this.sounds = new Sounds();
    this.rock = new Rock();
    this.paper = new Paper();
    this.scissors = new Scissors();

    this.player = new Player(this.rock);
    this.computerPlayer = new Player(this.rock);
    this.playerScoreElement = document.createElement('span');
    this.computerScoreElement = document.createElement('span');

    this.fight = new Fight(this.player, this.computerPlayer);

    this.playerWeaponContainer = document.createElement('div');
    this.computerWeaponContainer = document.createElement('div');
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    return button;
  }

  private hideWeapons() {
    const weapons = document.querySelectorAll<HTMLImageElement>('.weapon');

    weapons.forEach((weapon) => {
      weapon.style.display = 'none';
    });
  }

  private showWeapons({
    playerWeaponName,
    computerWeaponName,
  }: {
    playerWeaponName: TWeaponName;
    computerWeaponName: TWeaponName;
  }) {
    this.hideWeapons();
    const playerWeapon = document.querySelector<HTMLImageElement>(
      `#player-weapon-${playerWeaponName}`
    );
    const computerWeapon = document.querySelector<HTMLImageElement>(
      `#computer-weapon-${computerWeaponName}`
    );
    if (playerWeapon) playerWeapon.style.display = 'block';
    if (computerWeapon) computerWeapon.style.display = 'block';
  }

  private renderScoreContainer() {
    const section = document.createElement('section');
    section.id = 'score';

    const playerScoreContainer = document.createElement('div');
    const computerScoreContainer = document.createElement('div');
    const playerText = document.createElement('div');
    playerText.innerText = 'Player:';
    const computerText = document.createElement('div');
    computerText.innerText = 'Computer:';

    playerScoreContainer.appendChild(playerText);
    playerScoreContainer.appendChild(this.playerScoreElement);
    computerScoreContainer.appendChild(computerText);
    computerScoreContainer.appendChild(this.computerScoreElement);

    section.appendChild(playerScoreContainer);
    section.appendChild(computerScoreContainer);

    this.renderScore();

    this.gameContainer.appendChild(section);
  }

  private renderScore() {
    this.playerScoreElement.innerText = this.player.score.toString();
    this.computerScoreElement.innerText = this.computerPlayer.score.toString();
  }

  private renderAnimationContainer() {
    const section = document.createElement('section');
    section.id = 'animation';

    const playerWeaponRock = this.rock.createImage({
      className: 'weapon',
      id: `player-weapon-${this.rock.whoIAm}`,
    });
    const playerWeaponPaper = this.paper.createImage({
      className: 'weapon',
      id: `player-weapon-${this.paper.whoIAm}`,
    });
    const playerWeaponScissors = this.scissors.createImage({
      className: 'weapon',
      id: `player-weapon-${this.scissors.whoIAm}`,
    });

    this.playerWeaponContainer.appendChild(playerWeaponRock);
    this.playerWeaponContainer.appendChild(playerWeaponPaper);
    this.playerWeaponContainer.appendChild(playerWeaponScissors);

    const computerWeaponRock = this.rock.createImage({
      className: 'weapon',
      id: `computer-weapon-${this.rock.whoIAm}`,
    });
    const computerWeaponPaper = this.paper.createImage({
      className: 'weapon',
      id: `computer-weapon-${this.paper.whoIAm}`,
    });
    const computerWeaponScissors = this.scissors.createImage({
      className: 'weapon',
      id: `computer-weapon-${this.scissors.whoIAm}`,
    });

    this.computerWeaponContainer.appendChild(computerWeaponRock);
    this.computerWeaponContainer.appendChild(computerWeaponPaper);
    this.computerWeaponContainer.appendChild(computerWeaponScissors);

    section.appendChild(this.playerWeaponContainer);
    section.appendChild(this.computerWeaponContainer);

    this.gameContainer.appendChild(section);

    this.hideWeapons();
    this.showWeapons({
      playerWeaponName: this.rock.whoIAm,
      computerWeaponName: this.rock.whoIAm,
    });
  }

  private renderHandsButtons() {
    const section = document.createElement('section');
    section.id = 'handButtons';

    const rockButton = this.createButton();
    rockButton.appendChild(this.rock.createImage());
    const paperButton = this.createButton();
    paperButton.appendChild(this.paper.createImage());
    const scissorsButton = this.createButton();
    scissorsButton.appendChild(this.scissors.createImage());

    section.appendChild(rockButton);
    section.appendChild(paperButton);
    section.appendChild(scissorsButton);

    this.gameContainer.appendChild(section);

    rockButton.addEventListener('click', () => {
      if (!this.canFight) return;
      this.player.setWeapon(this.rock);
      this.fightExecute();
    });

    paperButton.addEventListener('click', () => {
      if (!this.canFight) return;
      this.player.setWeapon(this.paper);
      this.fightExecute();
    });

    scissorsButton.addEventListener('click', () => {
      if (!this.canFight) return;
      this.player.setWeapon(this.scissors);
      this.fightExecute();
    });
  }

  private setComputerWeapon() {
    const random = Math.floor(Math.random() * 3) + 1;
    switch (random) {
      case 1:
        this.computerPlayer.setWeapon(this.rock);
        break;
      case 2:
        this.computerPlayer.setWeapon(this.paper);
        break;
      case 3:
        this.computerPlayer.setWeapon(this.scissors);
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

    this.setComputerWeapon();

    const result = this.fight.execute();

    this.showWeapons({
      playerWeaponName: this.rock.whoIAm,
      computerWeaponName: this.rock.whoIAm,
    });

    this.playerWeaponContainer.classList.add('playerWeaponAnimation');
    this.computerWeaponContainer.classList.add('computerWeaponAnimation');

    this.playerWeaponContainer.style.setProperty(
      '--duration',
      `${timeInSeconds - 1}s`
    );
    this.computerWeaponContainer.style.setProperty(
      '--duration',
      `${timeInSeconds - 1}s`
    );

    setTimeout(() => {
      this.playerWeaponContainer.classList.remove('playerWeaponAnimation');
      this.computerWeaponContainer.classList.remove('computerWeaponAnimation');
      this.showWeapons({
        playerWeaponName: this.player.weapon.whoIAm,
        computerWeaponName: this.computerPlayer.weapon.whoIAm,
      });

      this.renderScore();

      switch (result) {
        case 'win':
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
