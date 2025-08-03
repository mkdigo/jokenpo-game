import type { ElementInterface } from './ElementInterface';

export class Player {
  private _hand: ElementInterface;
  private _score: number;

  constructor(initialHand: ElementInterface) {
    this._hand = initialHand;
    this._score = 0;
  }

  get hand() {
    return this._hand;
  }

  get score() {
    return this._score;
  }

  public setHand(element: ElementInterface) {
    this._hand = element;
  }

  public addScore() {
    this._score++;
  }
}
