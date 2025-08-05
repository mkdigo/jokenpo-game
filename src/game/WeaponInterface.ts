export type TWeaponName = 'rock' | 'paper' | 'scissors';

export type TCreateImageProps = {
  className?: string;
  id?: string;
};

export interface WeaponInterface {
  whoIAm: TWeaponName;
  winsOf: TWeaponName;
  loseTo: TWeaponName;
  createImage: (props?: TCreateImageProps) => HTMLImageElement;
}
