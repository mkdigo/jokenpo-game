import type { WeaponInterface } from './WeaponInterface';

export class Player {
  private _weapon: WeaponInterface;
  private _score: number;

  constructor(initialWeapon: WeaponInterface) {
    this._weapon = initialWeapon;
    this._score = 0;
  }

  get weapon() {
    return this._weapon;
  }

  get score() {
    return this._score;
  }

  public setWeapon(weapon: WeaponInterface) {
    this._weapon = weapon;
  }

  public addScore() {
    this._score++;
  }
}
