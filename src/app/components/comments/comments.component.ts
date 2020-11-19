import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Build } from 'src/app/models/build';
import { Player } from 'src/app/models/player';
import { Vote } from 'src/app/models/vote';
import { DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() buildId: number;

  comments: Comment[];
  player: Player;

  constructor(
    public dataService: DataService,
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.player = this.playerService.getPlayer();
    this.playerService.loggedPlayer.subscribe(pl => {
      this.player = pl;
    });

    if (this.buildId) {
      this.dataService.getComments(this.buildId).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  getVotes(comment: Comment): number {
    return this.dataService.getVotesNumber(comment.votes);
  }


  hasUpvote(comment: Comment): boolean {
    if (this.player && comment.votes != null && comment.votes.length > 0) {
      return comment.votes.findIndex(vote => {
        return vote.player.id === this.player.id && vote.isUpvote;
      }) !== -1;
    } else {
      return false;
    }
  }

  hasDownvote(comment: Comment): boolean {
    if (this.player && comment.votes != null && comment.votes.length > 0) {
      return comment.votes.findIndex(vote => {
        return vote.player.id === this.player.id && !vote.isUpvote;
      }) !== -1;
    } else {
      return false;
    }
  }

  upvoteBuild(comment: Comment): void {
    this.manageVote(comment, true);
  }

  downvoteBuild(comment: Comment): void {
    this.manageVote(comment, false);
  }

  getPlayerVote(comment: Comment): Vote {
    if (comment.votes) {
      return comment.votes.find(v => {
        return v.player.id === this.player.id;
      });
    } else {
      return null;
    }
  }

  private manageVote(comment: Comment, isUpvote: boolean): void {
    const playerVote = this.getPlayerVote(comment);

    if (playerVote) {
      this.dataService.removeVote(playerVote.id).subscribe(result => {
        if (result) {
          comment.votes = comment.votes.filter(vote => {
            return vote.id !== playerVote.id;
          });
        }
      });

      if (playerVote.isUpvote !== isUpvote) {
        this.createVote(comment, isUpvote);
      }
    } else {
      this.createVote(comment, isUpvote);
    }
  }

  private createVote(comment: Comment, isUpvote: boolean): void {
    const vote = new Vote();

    vote.isUpvote = isUpvote;
    vote.player = this.player;
    vote.targetId = comment.id;

    this.dataService.addVote(vote).subscribe(result => {
      if (!comment.votes) {
        comment.votes = [];
      }

      comment.votes.push(result);
    });
  }
}
