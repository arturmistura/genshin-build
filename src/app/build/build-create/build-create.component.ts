import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtefactBonus } from '../../models/artefact-bonus';
import { ArtefactSet } from '../../models/artefact-set';
import { Build } from '../../models/build';
import { Character } from '../../models/character';
import { CharacterElement } from '../../models/character-element';
import { ElementGroupVM } from '../../models/vm/element-group-vm';
import { WeaponGroupVM } from '../../models/vm/weapon-group-vm';
import { Weapon } from '../../models/weapon';
import { Stat } from '../../models/stat';
import { WeaponType } from '../../models/weapon-type';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-build-create',
  templateUrl: './build-create.component.html',
  styleUrls: ['./build-create.component.scss']
})
export class BuildCreateComponent implements OnInit {
  buildForm: FormGroup;
  buildId: string;
  characters: Character[];
  elementGroup: ElementGroupVM[] = [];
  weaponGroup: WeaponGroupVM[] = [];
  artefactSets = new Observable<ArtefactSet[]>();
  availableBonus: ArtefactBonus[] = [];
  selectedBonus: ArtefactBonus[] = [];
  statCategories = [
    { value: true, label: 'Main stat' },
    { value: false, label: 'Sub stat' }
  ];
  selectedMainStatCategory: boolean = null;
  stats: Stat[] = [];
  selectedMainStats: Stat[] = [];
  selectedSubStats: Stat[] = [];

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
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
      character: new FormControl('', [Validators.required]),
      weapon: new FormControl('', [Validators.required]),
      suggestedTeam: new FormControl('', [Validators.required]),
      suggestedSets: new FormControl('', [Validators.required]),
      suggestedMainStats: new FormControl('', [Validators.required]),
      suggestedSubStats: new FormControl('', [Validators.required]),
      isPublic: new FormControl(true),
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

    this.artefactSets = this.dataService.getArtefactSets();
    this.dataService.getStats().subscribe(s => {
      this.stats = s;
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

  get name(): AbstractControl {
    return this.buildForm.get('name');
  }

  get description(): AbstractControl {
    return this.buildForm.get('description');
  }

  get suggestedSets(): AbstractControl {
    return this.buildForm.get('suggestedSets');
  }

  get suggestedMainStats(): AbstractControl {
    return this.buildForm.get('suggestedMainStats');
  }

  get suggestedSubStats(): AbstractControl {
    return this.buildForm.get('suggestedSubStats');
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
      this.dataService.saveBuild(build).subscribe(() => {
        this.buildForm.reset();
        this.snackBar.open('Your build is saved :)', null, { duration: 2000 });
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

  selectArtefactSetOption(artefactSet: ArtefactSet): void {
    this.availableBonus = artefactSet.bonus;
  }

  removeArtefactSet(artefactBonus: ArtefactBonus): void {
    const index = this.selectedBonus.indexOf(artefactBonus);

    this.selectedBonus.splice(index, 1);
    this.suggestedSets.patchValue(this.selectedBonus);
  }

  selectBonus(artefactBonus: ArtefactBonus): void {
    this.selectedBonus.push(artefactBonus);
    this.suggestedSets.patchValue(this.selectedBonus);
  }

  selectCategory(isMainStat: boolean): void {
    this.selectedMainStatCategory = isMainStat;
  }

  selectStat(stat: Stat): void {
    if (this.selectedMainStatCategory) {
      this.selectedMainStats.push(stat);
      this.suggestedMainStats.patchValue(this.selectedMainStats);
    } else {
      this.selectedSubStats.push(stat);
      this.suggestedSubStats.patchValue(this.selectedSubStats);
    }
  }

  removeStat(stat: Stat, stats: Stat[]): void {
    const index = stats.indexOf(stat);
    stats.splice(index, 1);
  }

  compareCharacter(c1: Character, c2: Character): boolean {
    return c1.id === c2.id;
  }

  compareWeapon(w1: Weapon, w2: Weapon): boolean {
    return w1.id === w2.id;
  }

  compareTeam(c1: Character, c2: Character): boolean {
    return c1.id === c2.id;
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
    this.buildForm.patchValue(build);
    this.selectedBonus = build.suggestedSets;
    this.selectedMainStats = build.suggestedMainStats;
    this.selectedSubStats = build.suggestedSubStats;
  }
}
