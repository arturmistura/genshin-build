import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Build } from '../models/build';
import { Character } from '../models/character';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  characters: Observable<Character[]>;
  selectedCharacter: Character = new Character();

  builds: Observable<Build[]>;
  buildColumns: string[] = ['character', 'name', 'votes', 'votes-icon', 'actions'];
  buildExpanded: Build | null;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.characters = this.dataService.getCharacters();
    this.builds = this.dataService.getBuilds();
  }

  selectCharacterFilter(): void {
    if (this.selectedCharacter != null && this.selectedCharacter.id != null) {
      this.builds = this.dataService.getBuildByCharacter(this.selectedCharacter);
    } else {
      this.builds = this.dataService.getBuilds();
    }
  }

  detailBuild(build: Build): void {
    this.router.navigate(['build/details', build.id ]);
  }
}
