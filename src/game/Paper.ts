import type {
  TCreateImageProps,
  TWeaponName,
  WeaponInterface,
} from './WeaponInterface';
import { Weapon } from './Weapon';
import imgSrc from '../assets/img/paper.png';

export class Paper extends Weapon implements WeaponInterface {
  whoIAm: TWeaponName = 'paper';
  winsOf: TWeaponName = 'rock';
  loseTo: TWeaponName = 'scissors';

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
