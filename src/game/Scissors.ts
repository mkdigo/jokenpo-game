import type { ElementInterface, TElement } from './ElementInterface';
import img from '../assets/img/scissors.png';

export class Scissors implements ElementInterface {
  whoIAm: TElement = 'scissors';
  winsOf: TElement = 'paper';
  loseTo: TElement = 'rock';

  img() {
    const imgElement = document.createElement('img');
    imgElement.src = img;
    return imgElement;
  }
}
