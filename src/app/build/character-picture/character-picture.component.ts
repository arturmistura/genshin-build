import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterElement } from 'src/app/models/character-element';

@Component({
  selector: 'app-character-picture',
  templateUrl: './character-picture.component.html',
  styleUrls: ['./character-picture.component.scss']
})
export class CharacterPictureComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() characters: Observable<Character[]>;
  @Input() element: CharacterElement;

  filteredCharacters: Character[];
  selectedIndex = -1;

  constructor() { }

  ngOnInit(): void {
    this.characters.subscribe(characters => {
      this.filteredCharacters = characters.filter(character =>
        character.characterElement === this.element ||
        this.element === CharacterElement.All);
    });
  }

  selectCharacter(character: Character, index: number): void {
    this.selectedIndex = index;
    this.parentForm.patchValue({ character });
  }
}
