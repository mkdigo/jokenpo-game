type TCreateImageProps = {
  src: string;
  id?: string;
  className?: string;
};

export class Weapon {
  createHTMLImageElement({ src, id, className }: TCreateImageProps) {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.id = id ?? '';
    imgElement.className = className ?? '';
    return imgElement;
  }
}
