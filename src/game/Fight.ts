import type { Player } from './Player';

type TResult = 'win' | 'lose' | 'draw';

export class Fight {
  private _lastResult: TResult | null = null;

  constructor(private player1: Player, private player2: Player) {}

  get lastResult() {
    return this._lastResult;
  }

  private setLastResult(result: TResult) {
    this._lastResult = result;
  }

  public execute(): TResult {
    if (this.player1.weapon.winsOf === this.player2.weapon.whoIAm) {
      this.player1.addScore();
      this.setLastResult('win');
      return 'win';
    }

    if (this.player1.weapon.loseTo === this.player2.weapon.whoIAm) {
      this.player2.addScore();
      this.setLastResult('lose');
      return 'lose';
    }

    this.setLastResult('draw');
    return 'draw';
  }
}
