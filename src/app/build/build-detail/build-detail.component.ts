import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtefactSetDetailComponent } from 'src/app/components/artefact-set-detail/artefact-set-detail.component';
import { Artefact } from 'src/app/models/artefact';
import { ArtefactBonus } from 'src/app/models/artefact-bonus';
import { ArtefactSet } from 'src/app/models/artefact-set';
import { ArtefactType } from 'src/app/models/artefact-type';
import { Build } from 'src/app/models/build';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-build-detail',
  templateUrl: './build-detail.component.html',
  styleUrls: ['./build-detail.component.scss']
})
export class BuildDetailComponent implements OnInit {

  build: Build;
  artefacts: any[];
  equipedSets: ArtefactSet[];
  artefactColumns: string[] = ['artefactSlot', 'mainStat', 'sb1', 'sb2', 'sb3', 'sb4'];

  constructor(
    public dataService: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/']);
      } else {
        this.dataService.getBuildById(id).subscribe(build => {
          this.artefacts = [
            { picture: './../assets/images/artefacts/flower_of_life.png', artefact: this.getArtefactData(build.flowerOfLife) },
            { picture: './../assets/images/artefacts/plume_of_death.png', artefact: this.getArtefactData(build.plumeOfDeath) },
            { picture: './../assets/images/artefacts/sands_of_eon.png', artefact: this.getArtefactData(build.sandsOfEon) },
            { picture: './../assets/images/artefacts/goblet_of_enotherm.png', artefact: this.getArtefactData(build.gobletOfEnotherm) },
            { picture: './../assets/images/artefacts/circle_of_logos.png', artefact: this.getArtefactData(build.circletOfLogos) },
          ];

          this.build = build;
          this.equipedSets = this.getEquipedSets();
        });
      }
    });
  }

  getArtefactData(artefact: Artefact): any {
    return {
      mainStat: artefact.mainStat,
      subStat1: artefact.subStat1,
      subStat2: artefact.subStat2,
      subStat3: artefact.subStat3,
      subStat4: artefact.subStat4,
    };
  }

  getBadgeNumber(): number {
    let badgeNumber = 0;

    this.equipedSets.forEach(set => {
      badgeNumber += set.bonus.length;
    });

    return badgeNumber;
  }

  private getEquipedSets(): ArtefactSet[] {
    const equipedSets: ArtefactSet[] = [];
    const equipedArtefactSets: ArtefactSet[] = this.getBuildArtefactSets();

    equipedArtefactSets.forEach(item => {
      const pieces = this.numberPiecesSetEquiped(item);

      if (pieces >= 2) {
        if (equipedSets.findIndex(es => es.id === item.id) === -1) {
          equipedSets.push({
            id: item.id,
            name: item.name,
            bonus: this.getBonus(pieces, item)
          });
        }
      }
    });

    return equipedSets;
  }

  showSetBonus(artefactSets: ArtefactSet[]): void {
    this.snackBar.openFromComponent(ArtefactSetDetailComponent, {
      data: artefactSets
    });
  }

  private getBonus(pieces: number, equipedSets: ArtefactSet): ArtefactBonus[] {
    const result: ArtefactBonus[] = [];

    if (pieces >= 2) {
      result.push(equipedSets.bonus[0]);
    }

    if (pieces >= 4) {
      result.push(equipedSets.bonus[1]);
    }

    return result;
  }

  private getBuildArtefactSets(): ArtefactSet[] {
    return [
      this.build.circletOfLogos.artefactSet,
      this.build.flowerOfLife.artefactSet,
      this.build.gobletOfEnotherm.artefactSet,
      this.build.plumeOfDeath.artefactSet,
      this.build.sandsOfEon.artefactSet
    ];
  }

  private numberPiecesSetEquiped(set: ArtefactSet): number {
    return this.getBuildArtefactSets().filter(artefactSet => {
      return artefactSet.id === set.id;
    }).length;
  }
}
