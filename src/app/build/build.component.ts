import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Build } from '../models/build';
import { Character } from '../models/character';
import { CharacterElement } from '../models/character-element';
import { ElementGroupVM } from '../models/vm/element-group-vm';
import { WeaponGroupVM } from '../models/vm/weapon-group-vm';
import { Weapon } from '../models/weapon';
import { WeaponType } from '../models/weapon-type';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {
  buildForm: FormGroup;
  buildId: string;
  characters: Character[];
  elementGroup: ElementGroupVM[] = [];
  weaponGroup: WeaponGroupVM[] = [];

  constructor(
    public dataService: DataService,
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar) {
    this.route.paramMap.subscribe(params => {
      this.buildId = params.get('id');
      if (this.buildId) {
        this.dataService.getBuildById(this.buildId).subscribe(build => {
          this.setEditingBuild(build);
        });
      }
    });

    this.buildForm = fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
      character: new FormControl('', [Validators.required]),
      weapon: new FormControl('', [Validators.required]),
      suggestedTeam: new FormControl('', [Validators.required]),
      isPublic: new FormControl(true),
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
    this.dataService.getCharacters().subscribe(characters => {
      this.setCharactersByElement(characters, CharacterElement.Anemo);
      this.setCharactersByElement(characters, CharacterElement.Cryo);
      this.setCharactersByElement(characters, CharacterElement.Electro);
      this.setCharactersByElement(characters, CharacterElement.Geo);
      this.setCharactersByElement(characters, CharacterElement.Hydro);
      this.setCharactersByElement(characters, CharacterElement.Pyro);
    });

    this.dataService.getWeapons().subscribe(weapons => {
      this.setWeaponsByType(weapons, WeaponType.Bow);
      this.setWeaponsByType(weapons, WeaponType.Catalyst);
      this.setWeaponsByType(weapons, WeaponType.Claymore);
      this.setWeaponsByType(weapons, WeaponType.Polearm);
      this.setWeaponsByType(weapons, WeaponType.Sword);
    });
  }

  get character(): AbstractControl {
    return this.buildForm.get('character');
  }

  get weapon(): AbstractControl {
    return this.buildForm.get('weapon');
  }

  get suggestedTeam(): AbstractControl {
    return this.buildForm.get('suggestedTeam');
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

  get isPublic(): AbstractControl {
    return this.buildForm.controls.isPublic;
  }

  openSnackBarValidation(): void {
    this.snackBar.open('There is some fields to fill before save :(', null, { duration: 2000 });
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

  disableTeamOption(character: Character): boolean {
    const team = this.suggestedTeam.value as Character[];

    if (team) {
      if (team.length === 3 && team.findIndex(t => t.id === character.id) === -1) {
        return true;
      }
    }

    return false;
  }

  private setCharactersByElement(characters: Character[], element: CharacterElement): void {
    const elementText: string = CharacterElement[element];
    this.elementGroup.push({
      elementText,
      characters: characters.filter(c => c.characterElement === element)
    });
  }

  private setWeaponsByType(weapons: Weapon[], weaponType: WeaponType): void {
    const weaponTypeText: string = WeaponType[weaponType];
    this.weaponGroup.push({
      weaponTypeText,
      weapons: weapons.filter(c => c.weaponType === weaponType)
    });
  }

  private setEditingBuild(build: Build): void {
    this.character.patchValue(build.character);
    this.buildForm.patchValue(build);
  }
}
