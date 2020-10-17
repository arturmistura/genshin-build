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
    { label: 'Anemo', element: CharacterElement.Anemo, characters: [] },
    { label: 'Cryo', element: CharacterElement.Cryo, characters: [] },
    { label: 'Electro', element: CharacterElement.Electro, characters: [] },
    { label: 'Geo', element: CharacterElement.Geo, characters: [] },
    { label: 'Hydro', element: CharacterElement.Hydro, characters: [] },
    { label: 'Pyro', element: CharacterElement.Pyro, characters: [] },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCharacters().subscribe(characters => {
      this.allElements.forEach(item => {
        item.characters = characters.filter(a => a.characterElement === item.element);
      });
    });
  }

  get character(): AbstractControl {
    return this.parentForm.controls.character;
  }

  get team(): AbstractControl {
    return this.parentForm.controls.team;
  }

  selectTeamMember(character: Character): void {
    if (this.canSelect(character)) {
      if (this.selectedCharacters.length < 3) {
        this.selectedCharacters.push(character);
      }
    }

    this.team.setValue(this.selectedCharacters);
  }

  removeTeamMember(character: Character): void {
    this.selectedCharacters = this.selectedCharacters.filter(c => c.id !== character.id);
  }

  canSelect(character: Character): boolean {
    return (this.selectedCharacters === null) ||
      (this.selectedCharacters.length < 3 &&
        this.selectedCharacters.findIndex(item => item.id === character.id) === -1 &&
        character.id !== this.character.value.id);
  }
}
