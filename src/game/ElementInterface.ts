export type TElement = 'rock' | 'paper' | 'scissors';

export interface ElementInterface {
  whoIAm: TElement;
  winsOf: TElement;
  loseTo: TElement;
  img: () => HTMLImageElement;
}
