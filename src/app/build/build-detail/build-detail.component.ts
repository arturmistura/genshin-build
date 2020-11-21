import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtefactSetDetailComponent } from 'src/app/components/artefact-set-detail/artefact-set-detail.component';
import { Artefact } from 'src/app/models/artefact';
import { ArtefactBonus } from 'src/app/models/artefact-bonus';
import { ArtefactSet } from 'src/app/models/artefact-set';
import { Build } from 'src/app/models/build';
import { Player } from 'src/app/models/player';
import { Vote } from 'src/app/models/vote';
import { DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';

@Component({
  selector: 'app-build-detail',
  templateUrl: './build-detail.component.html',
  styleUrls: ['./build-detail.component.scss']
})
export class BuildDetailComponent implements OnInit {

  player: Player;
  buildId: string;
  build: Build;

  constructor(
    public dataService: DataService,
    public router: Router,
    public playerService: PlayerService,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.player = this.playerService.getPlayer();
    this.playerService.loggedPlayer.subscribe(pl => {
      this.player = pl;
    });

    this.route.paramMap.subscribe(params => {
      this.buildId = params.get('id');
      if (!this.buildId) {
        this.router.navigate(['/']);
      } else {
        this.dataService.getBuildById(this.buildId).subscribe(build => {
          this.build = build;
        });
      }
    });
  }

  getVotes(): number {
    return this.dataService.getVotesNumber(this.build.votes);
  }

  hasVote(): boolean {
    if (this.player) {
      return this.build.votes.findIndex(vote => vote.player.id === this.player.id) !== -1;
    } else {
      return false;
    }
  }

  hasUpvote(): boolean {
    if (this.player) {
      return this.build.votes.findIndex(vote => {
        return vote.player.id === this.player.id && vote.isUpvote;
      }) !== -1;
    } else {
      return false;
    }
  }

  hasDownvote(): boolean {
    if (this.player) {
      return this.build.votes.findIndex(vote => {
        return vote.player.id === this.player.id && !vote.isUpvote;
      }) !== -1;
    } else {
      return false;
    }
  }

  upvoteBuild(): void {
    this.manageVote(true);
  }

  downvoteBuild(): void {
    this.manageVote(false);
  }

  getPlayerVote(): Vote {
    return this.build.votes.find(v => v.player.id === this.player.id);
  }

  private manageVote(isUpvote: boolean): void {
    const playerVote = this.getPlayerVote();

    if (playerVote) {
      this.dataService.removeVote(playerVote.id).subscribe(result => {
        if (result) {
          this.build.votes = this.build.votes.filter(vote => {
            return vote.id !== playerVote.id;
          });
        }
      });

      if (playerVote.isUpvote !== isUpvote) {
        this.createVote(isUpvote);
      }
    } else {
      this.createVote(isUpvote);
    }
  }

  private createVote(isUpvote: boolean): void {
    const vote = new Vote();

    vote.isUpvote = isUpvote;
    vote.player = this.player;
    vote.targetId = this.build.id;

    this.dataService.addVote(vote).subscribe(result => {
      this.build.votes.push(result);
    });
  }
}
