import { Component, Input, OnInit, TestabilityRegistry } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterElement } from 'src/app/models/character-element';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {
  @Input() parentForm: FormGroup;

  characters: Observable<Character[]>;

  allElements = [
    // { label: 'All Elements', element: CharacterElement.All },
    { label: 'Anemo', element: CharacterElement.Anemo },
    { label: 'Cryo', element: CharacterElement.Cryo },
    { label: 'Electro', element: CharacterElement.Electro },
    { label: 'Geo', element: CharacterElement.Geo },
    { label: 'Hydro', element: CharacterElement.Hydro },
    { label: 'Pyro', element: CharacterElement.Pyro },
  ];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.characters = this.dataService.getCharacters();
  }
}
