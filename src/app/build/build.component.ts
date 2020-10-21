import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    public dataService: DataService,
    public fb: FormBuilder,
    public router: Router,
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
        subStat1: new FormControl(''),
        subStat2: new FormControl(''),
        subStat3: new FormControl(''),
        subStat4: new FormControl('')
      }),
      plumeOfDeath: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl(''),
        subStat2: new FormControl(''),
        subStat3: new FormControl(''),
        subStat4: new FormControl('')
      }),
      sandsOfEon: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl(''),
        subStat2: new FormControl(''),
        subStat3: new FormControl(''),
        subStat4: new FormControl('')
      }),
      gobletOfEnotherm: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl(''),
        subStat2: new FormControl(''),
        subStat3: new FormControl(''),
        subStat4: new FormControl('')
      }),
      circletOfLogos: new FormGroup({
        artefactSet: new FormControl('', [Validators.required]),
        mainStat: new FormControl('', [Validators.required]),
        subStat1: new FormControl(''),
        subStat2: new FormControl(''),
        subStat3: new FormControl(''),
        subStat4: new FormControl('')
      }),
    });
  }

  ngOnInit(): void {

  }

  get character(): AbstractControl {
    return this.buildForm.get('character');
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
    this.snackBar.open('There is some fields to fill before save :(', );
  }

  saveBuild(): void {
    if (this.buildForm.valid) {
      const build = this.buildForm.value as Build;
      build.owner = JSON.parse(localStorage.getItem('socialUser'));
      this.dataService.saveBuild(build).subscribe(result => {
        this.buildForm.reset();
        this.snackBar.open('Your build is saved :)');
        this.router.navigate(['/']);
      });
    } else {
      this.openSnackBarValidation();
    }
  }
}
