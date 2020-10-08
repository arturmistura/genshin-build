import { Component } from '@angular/core';
import { Character } from './models/character';
import { Weapon } from './models/weapon';
import { WeaponType } from './models/weapon-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'genshin-build';
  picBasePathWeapon = 'https://rerollcdn.com/GENSHIN/Weapon/NEW/';
  picBasePathCharacter = 'https://rerollcdn.com/GENSHIN/Characters/';
  picExtension = '.png';
  selectedCharacter: Character = new Character();
  selectedWeapon: Weapon = new Weapon();

  characters: Character[] = [
    { id: 1, name: 'Keqing', weaponType: WeaponType.Sword },
    { id: 2, name: 'Mona', weaponType: WeaponType.Catalyst },
    { id: 3, name: 'Qiqi', weaponType: WeaponType.Sword },
    { id: 4, name: 'Sucrose', weaponType: WeaponType.Catalyst },
    { id: 5, name: 'Amber', weaponType: WeaponType.Bow },
    { id: 6, name: 'Barbara', weaponType: WeaponType.Catalyst },
    { id: 7, name: 'Beidou', weaponType: WeaponType.Claymore },
    { id: 8, name: 'Bennett', weaponType: WeaponType.Sword },
    { id: 9, name: 'Chongyun', weaponType: WeaponType.Claymore },
    { id: 10, name: 'Diluc', weaponType: WeaponType.Claymore },
    { id: 11, name: 'Fischl', weaponType: WeaponType.Bow },
    { id: 12, name: 'Jean', weaponType: WeaponType.Sword },
    { id: 13, name: 'Kaeya', weaponType: WeaponType.Sword },
    { id: 14, name: 'Klee', weaponType: WeaponType.Catalyst },
    { id: 15, name: 'Lisa', weaponType: WeaponType.Catalyst },
    { id: 16, name: 'Ningguang', weaponType: WeaponType.Catalyst },
    { id: 17, name: 'Noelle', weaponType: WeaponType.Claymore },
    { id: 18, name: 'Razor', weaponType: WeaponType.Claymore },
    { id: 19, name: 'Traveler (Anemo)', weaponType: WeaponType.Sword },
    { id: 20, name: 'Traveler (Geo)', weaponType: WeaponType.Sword },
    { id: 21, name: 'Venti', weaponType: WeaponType.Bow },
    { id: 22, name: 'Xiangling', weaponType: WeaponType.Polearm },
    { id: 23, name: 'Xiao', weaponType: WeaponType.Polearm },
    { id: 24, name: 'Xingqiu', weaponType: WeaponType.Sword }
  ];

  weapons: Weapon[] = [
    { id: 1, name: 'Alley Hunter', type: WeaponType.Bow },
    { id: 2, name: 'Amos\' Bow', type: WeaponType.Bow },
    { id: 3, name: 'Amber Catalyst', type: WeaponType.Catalyst },
    { id: 4, name: 'Apprentice\'s Notes', type: WeaponType.Catalyst },
    { id: 5, name: 'Blackcliff Slasher', type: WeaponType.Claymore },
    { id: 6, name: 'Bloodtainted Greatsword', type: WeaponType.Claymore },
    { id: 7, name: 'Black Tassel', type: WeaponType.Polearm },
    { id: 8, name: 'Blackcliff Pole', type: WeaponType.Polearm },
    { id: 9, name: 'Aquila Favonia', type: WeaponType.Sword },
    { id: 10, name: 'Blackcliff Longsword', type: WeaponType.Sword }
  ];

  getWeapons(): Weapon[] {
    if (this.selectedCharacter != null) {
      return this.weapons.filter(item => {
        return item.type === this.selectedCharacter.weaponType;
      });
    }

    return [];
  }

  formatImageName(weaponName: string): string {
    if (weaponName != null) {
      return weaponName.replace(' ', '_');
    }

    return '';
  }
}
