import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Build } from '../models/build';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {
  buildForm: FormGroup;

  builds: Observable<Build[]>;

  constructor(public dataService: DataService,
    public fb: FormBuilder,
    public snackBar: MatSnackBar) {
    this.buildForm = fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
      character: new FormControl('', [Validators.required]),
      weapon: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
      flowerOfLife: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl('', [Validators.required]),
        subStat2: new FormControl('', [Validators.required]),
        subStat3: new FormControl('', [Validators.required]),
        subStat4: new FormControl('', [Validators.required])
      }),
      plumeOfDeath: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl('', [Validators.required]),
        subStat2: new FormControl('', [Validators.required]),
        subStat3: new FormControl('', [Validators.required]),
        subStat4: new FormControl('', [Validators.required])
      }),
      sandsOfEon: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl('', [Validators.required]),
        subStat2: new FormControl('', [Validators.required]),
        subStat3: new FormControl('', [Validators.required]),
        subStat4: new FormControl('', [Validators.required])
      }),
      gobletOfEnotherm: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl('', [Validators.required]),
        subStat2: new FormControl('', [Validators.required]),
        subStat3: new FormControl('', [Validators.required]),
        subStat4: new FormControl('', [Validators.required])
      }),
      circletOfLogos: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl('', [Validators.required]),
        subStat2: new FormControl('', [Validators.required]),
        subStat3: new FormControl('', [Validators.required]),
        subStat4: new FormControl('', [Validators.required])
      }),
    });
  }

  ngOnInit(): void {
    this.refreshBuilds();
  }

  get flowerOfLife(): FormGroup {
    return this.buildForm.get('flowerOfLife') as FormGroup;
  }

  get plumeOfDeath(): FormGroup {
    return this.buildForm.get('plumeOfDeath') as FormGroup;
  }

  get sandsOfEon(): FormGroup {
    return this.buildForm.get('sandsOfEon') as FormGroup;
  }

  get gobletOfEnotherm(): FormGroup {
    return this.buildForm.get('gobletOfEnotherm') as FormGroup;
  }

  get circletOfLogos(): FormGroup {
    return this.buildForm.get('circletOfLogos') as FormGroup;
  }

  openSnackBarValidation(): void {
    this.snackBar.open('There is some fields to fill before save :(');
  }

  saveBuild(): void {
    if (this.buildForm.valid) {
      const build = this.buildForm.value as Build;
      this.dataService.saveBuild(build);
      this.refreshBuilds();
    } else {
      this.openSnackBarValidation();
    }
  }

  refreshBuilds(): void {
    this.builds = this.dataService.getBuilds();
  }
}
