import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ArtefactSet } from 'src/app/models/artefact-set';

@Component({
  selector: 'app-artefact-set-detail',
  templateUrl: './artefact-set-detail.component.html',
  styleUrls: ['./artefact-set-detail.component.scss']
})
export class ArtefactSetDetailComponent implements OnInit {

  sets: ArtefactSet[];

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackRef: MatSnackBarRef<ArtefactSetDetailComponent>) {
    this.sets = data as ArtefactSet[];
  }

  ngOnInit(): void {
  }

  close(): void {
    this.snackRef.dismiss();
  }
}
