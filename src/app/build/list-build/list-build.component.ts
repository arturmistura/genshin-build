import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { Build } from 'src/app/models/build';
import { Player } from 'src/app/models/player';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-list-build',
  templateUrl: './list-build.component.html',
  styleUrls: ['./list-build.component.scss']
})
export class ListBuildComponent implements OnInit {
  builds: Observable<Build[]>;
  buildColumns: string[] = ['character', 'name', 'votes', 'actions'];

  constructor(
    public dataService: DataService,
    public router: Router,
    public zone: NgZone) { }

  ngOnInit(): void {
    this.zone.run(() => {
      const owner = JSON.parse(localStorage.getItem('socialUser'));

      this.builds = this.dataService.getBuildByPlayer(owner);
    });
  }

  getVotes(build: Build): number {
    return this.dataService.getVotesNumber(build.votes);
  }

  editBuild(build: Build): void {
    this.router.navigate(['build/', build.id]);
  }
}
