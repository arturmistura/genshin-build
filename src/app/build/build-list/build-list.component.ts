import { Component, Input, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Build } from 'src/app/models/build';
import { Player } from 'src/app/models/player';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {
  builds: Observable<Build[]>;
  buildColumns: string[] = ['character', 'name', 'votes', 'actions'];
  owner: Player;

  constructor(
    public dataService: DataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public zone: NgZone) { }

  ngOnInit(): void {
    this.zone.run(() => {
      this.owner = JSON.parse(localStorage.getItem('socialUser'));

      this.builds = this.dataService.getBuildByPlayer(this.owner);
    });
  }

  getVotes(build: Build): number {
    return this.dataService.getVotesNumber(build.votes);
  }

  editBuild(build: Build): void {
    this.router.navigate(['build/', build.id]);
  }

  deleteBuild(build: Build): void {
    if (confirm('Do you realy want to delete this build? You cant recovery it!!')) {
      this.dataService.deleteBuild(build).subscribe(() => {
        this.builds = this.dataService.getBuildByPlayer(this.owner);
        this.snackBar.open('Your build was deleted!!', null, { duration: 2000 });
        window.location.reload();
      });
    }
  }
}
