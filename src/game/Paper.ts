import type { ElementInterface, TElement } from './ElementInterface';
import img from '../assets/img/paper.png';

export class Paper implements ElementInterface {
  whoIAm: TElement = 'paper';
  winsOf: TElement = 'rock';
  loseTo: TElement = 'scissors';

  img() {
    const imgElement = document.createElement('img');
    imgElement.src = img;
    return imgElement;
  }
}
