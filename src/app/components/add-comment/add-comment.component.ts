import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Build } from 'src/app/models/build';
import { Comment } from 'src/app/models/comment';
import { Player } from 'src/app/models/player';
import { BuildCommentCreateVM } from 'src/app/models/viewmodels/build-comment-create-vm';
import { DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() build: Build;

  commentForm: FormGroup;
  player: Player;

  constructor(
    public fb: FormBuilder,
    public dataService: DataService,
    public playerService: PlayerService,
    public snackBar: MatSnackBar
  ) {
    this.player = this.playerService.getPlayer();
    this.commentForm = fb.group({
      comment: new FormControl('', [Validators.required, Validators.maxLength(5000)])
    });
  }

  ngOnInit(): void {
  }

  get comment(): AbstractControl {
    return this.commentForm.controls.comment;
  }

  addComment(): void {
    if (this.commentForm.valid) {
      const cm = new Comment();

      cm.player = this.player;
      cm.text = this.comment.value;
      cm.buildId = this.build.id;

      this.dataService.addComment(cm).subscribe(() => {
        this.snackBar.open('Thanks for your comment');
        this.commentForm.reset();
      });
    }
  }
}
