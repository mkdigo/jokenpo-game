import type {
  TCreateImageProps,
  TWeaponName,
  WeaponInterface,
} from './WeaponInterface';
import { Weapon } from './Weapon';
import imgSrc from '../assets/img/scissors.png';

export class Scissors extends Weapon implements WeaponInterface {
  whoIAm: TWeaponName = 'scissors';
  winsOf: TWeaponName = 'paper';
  loseTo: TWeaponName = 'rock';

  constructor() {
    super();
  }

  createImage(props?: TCreateImageProps) {
    return this.createHTMLImageElement({
      src: imgSrc,
      className: props?.className,
      id: props?.id,
    });
  }
}
