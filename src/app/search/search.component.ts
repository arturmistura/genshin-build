import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Build } from '../models/build';
import { Character } from '../models/character';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  characters: Observable<Character[]>;
  selectedCharacter: Character = new Character();

  builds: Build[];
  buildColumns: string[] = ['character', 'name', 'votes', 'votes-icon', 'actions'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.characters = this.dataService.getCharacters();
    this.builds = this.dataService.getBuilds();
  }

}
