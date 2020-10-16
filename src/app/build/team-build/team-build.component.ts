import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
  @Input() parentForm: FormGroup;

  characters: Observable<Character[]>;
  weapons: Weapon[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.characters = this.dataService.getCharacters();

    this.character.valueChanges.subscribe(() => {
      this.changeMainCharacter();
    });
  }

  get character(): AbstractControl {
    return this.parentForm.controls.character;
  }

  get weapon(): AbstractControl {
    return this.parentForm.controls.weapon;
  }

  get team(): AbstractControl {
    return this.parentForm.controls.team;
  }

  changeMainCharacter(): void {
    if (this.character.value != null) {
      this.dataService.getWeapons().subscribe(weapons => {
        this.weapons = weapons.filter(weapon => weapon.weaponType === this.character.value.weaponType);
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
    if (this.team.value.length >= 3) {
      this.team.setValue(this.team.value);
    }
  }

  canSelect(character: Character): boolean {
    return (this.team.value != null &&
      this.team.value.length >= 3 &&
      this.team.value.findIndex(item => item.id === character.id) === -1) ||
      (this.team.value != null && this.team.value.id === character.id) ||
      (character.id === this.character.value.id);
  }
}
