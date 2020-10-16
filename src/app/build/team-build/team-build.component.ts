import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterElement } from 'src/app/models/character-element';
import { Weapon } from 'src/app/models/weapon';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-team-build',
  templateUrl: './team-build.component.html',
  styleUrls: ['./team-build.component.scss']
})
export class TeamBuildComponent implements OnInit {
  @Input() parentForm: FormGroup;

  filteredCharacters: Character[];
  selectedCharacters: Character[] = [];

  allElements = [
    { label: 'Anemo', element: CharacterElement.Anemo },
    { label: 'Cryo', element: CharacterElement.Cryo },
    { label: 'Electro', element: CharacterElement.Electro },
    { label: 'Geo', element: CharacterElement.Geo },
    { label: 'Hydro', element: CharacterElement.Hydro },
    { label: 'Pyro', element: CharacterElement.Pyro },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCharacters().subscribe(characters => {
      this.filteredCharacters = characters;
    });
  }

  get character(): AbstractControl {
    return this.parentForm.controls.character;
  }

  get team(): AbstractControl {
    return this.parentForm.controls.team;
  }

  selectTeamMember(character: Character): void {
    if (this.selectedCharacters.length < 3) {
      this.selectedCharacters.push(character);
    }else {
      this.team.setValue(this.selectedCharacters);
    }
  }
  removeTeamMember(character: Character): void {
    this.selectedCharacters = this.selectedCharacters.filter(c => c.id !== character.id);
  }

  canSelect(character: Character): boolean {
    return (this.team.value != null &&
      this.team.value.length >= 3 &&
      this.team.value.findIndex(item => item.id === character.id) === -1) ||
      (this.team.value != null && this.team.value.id === character.id) ||
      (character.id === this.character.value.id);
  }
}
