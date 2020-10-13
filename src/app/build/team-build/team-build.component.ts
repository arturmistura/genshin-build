import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { Weapon } from 'src/app/models/weapon';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-team-build',
  templateUrl: './team-build.component.html',
  styleUrls: ['./team-build.component.scss']
})
export class TeamBuildComponent implements OnInit {
  picBasePathWeapon = 'https://rerollcdn.com/GENSHIN/Weapon/NEW/';
  picBasePathCharacter = 'https://rerollcdn.com/GENSHIN/Characters/';
  picExtension = '.png';

  characters: Observable<Character[]>;
  selectedCharacter: Character = new Character();

  selectedWeapon: Weapon = new Weapon();

  suggestedTeam = new FormControl();
  suggestedTeamSelected: Character[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.characters = this.dataService.getCharacters();
  }

  getWeapons(): Weapon[] {
    if (this.selectedCharacter != null) {
      return this.dataService.getWeaponsByType(this.selectedCharacter.weaponType);
    }

    return [];
  }

  formatImageName(weaponName: string): string {
    if (weaponName != null) {
      return weaponName.replace(' ', '_');
    }

    return '';
  }

  suggestedTeamChanged(): void {
    if (this.suggestedTeam.value.length <= 3) {
      this.suggestedTeamSelected = this.suggestedTeam.value;
    } else {
      this.suggestedTeam.setValue(this.suggestedTeamSelected);
    }
  }

  canSelect(character: Character): boolean {
    return (this.suggestedTeamSelected != null &&
      this.suggestedTeamSelected.length >= 3 &&
      this.suggestedTeamSelected.findIndex(item => item.id === character.id) === -1) ||
      (this.selectedCharacter != null &&
        this.selectedCharacter.id === character.id);
  }
}
