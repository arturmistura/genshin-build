import { WeaponType } from './weapon-type';
import { CharacterElement } from './character-element';

export class Character {
  id: number;
  name: string;
  weaponType: WeaponType;
  picture: string;
  characterElement: CharacterElement;
}
