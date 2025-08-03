import type { ElementInterface, TElement } from './ElementInterface';
import img from '../assets/img/rock.png';

export class Rock implements ElementInterface {
  whoIAm: TElement = 'rock';
  winsOf: TElement = 'scissors';
  loseTo: TElement = 'paper';

  img() {
    const imgElement = document.createElement('img');
    imgElement.src = img;
    return imgElement;
  }
}
