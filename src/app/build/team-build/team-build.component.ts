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
  characters: Observable<Character[]>;
  selectedCharacter: Character = new Character();

  weapons: Weapon[];
  selectedWeapon: Weapon = new Weapon();

  suggestedTeam = new FormControl();
  suggestedTeamSelected: Character[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.characters = this.dataService.getCharacters();
  }

  changeMainCharacter(): void {
    if (this.selectedCharacter != null) {
      this.dataService.getWeapons().subscribe(weapons => {
        this.weapons = weapons.filter(weapon => weapon.weaponType === this.selectedCharacter.weaponType);
      });
    } else {
      this.weapons = [];
    }
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
