import { Component, OnInit } from '@angular/core';
import { Build } from 'src/app/models/build';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-list-build',
  templateUrl: './list-build.component.html',
  styleUrls: ['./list-build.component.scss']
})
export class ListBuildComponent implements OnInit {
  picBasePathWeapon = 'https://rerollcdn.com/GENSHIN/Weapon/NEW/';
  picBasePathCharacter = 'https://rerollcdn.com/GENSHIN/Characters/';
  picExtension = '.png';

  builds: Build[];

  buildColumns: string[] = ['character', 'name', 'votes', 'votes-icon', 'actions'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.builds = this.dataService.getBuilds();
  }

}
