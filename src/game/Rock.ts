import type {
  TCreateImageProps,
  TWeaponName,
  WeaponInterface,
} from './WeaponInterface';
import { Weapon } from './Weapon';
import imgSrc from '../assets/img/rock.png';

export class Rock extends Weapon implements WeaponInterface {
  whoIAm: TWeaponName = 'rock';
  winsOf: TWeaponName = 'scissors';
  loseTo: TWeaponName = 'paper';

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
