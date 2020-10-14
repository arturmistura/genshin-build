import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Build } from 'src/app/models/build';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-list-build',
  templateUrl: './list-build.component.html',
  styleUrls: ['./list-build.component.scss']
})
export class ListBuildComponent implements OnInit {
  @Input() builds: Observable<Build[]>;

  picBasePathWeapon = 'https://rerollcdn.com/GENSHIN/Weapon/NEW/';
  picBasePathCharacter = 'https://rerollcdn.com/GENSHIN/Characters/';
  picExtension = '.png';

  buildColumns: string[] = ['character', 'name', 'votes', 'votes-icon', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
