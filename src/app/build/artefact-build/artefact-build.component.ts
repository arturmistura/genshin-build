import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Artefact } from 'src/app/models/artefact';
import { ArtefactBonus } from 'src/app/models/artefact-bonus';
import { ArtefactType } from 'src/app/models/artefact-type';
import { StatType } from 'src/app/models/stat-type';
import { ArtefactSet } from '../../models/artefact-set';
import { Stat } from '../../models/stat';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-artefact-build',
  templateUrl: './artefact-build.component.html',
  styleUrls: ['./artefact-build.component.scss']
})
export class ArtefactBuildComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() artefactType: ArtefactType;

  mainStats: Stat[];
  subStats: Stat[];
  artefactSets: ArtefactSet[];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStats().subscribe(stats => {
      this.subStats = stats;
      this.setMainStats();
    });

    this.dataService.getArtefactSets().subscribe(sets => {
      this.artefactSets = sets;
    });
  }

  get mainStat(): AbstractControl {
    return this.parentForm.controls.mainStat;
  }

  get subStat1(): AbstractControl {
    return this.parentForm.controls.subStat1;
  }

  get subStat2(): AbstractControl {
    return this.parentForm.controls.subStat2;
  }

  get subStat3(): AbstractControl {
    return this.parentForm.controls.subStat3;
  }

  get subStat4(): AbstractControl {
    return this.parentForm.controls.subStat4;
  }

  get artefactSet(): AbstractControl {
    return this.parentForm.controls.artefactSet;
  }

  hasSubStat(subStat: Stat): boolean {
    return (this.mainStat.value != null && this.mainStat.value.statType === subStat.statType) ||
      (this.subStat1.value != null && this.subStat1.value.statType === subStat.statType) ||
      (this.subStat2.value != null && this.subStat2.value.statType === subStat.statType) ||
      (this.subStat3.value != null && this.subStat3.value.statType === subStat.statType) ||
      (this.subStat4.value != null && this.subStat4.value.statType === subStat.statType);
  }

  setMainStats(): void {
    switch (this.artefactType) {
      case ArtefactType.CircletOfLogos:
        this.mainStats = this.getStatsCircletOfLogos();
        break;
      case ArtefactType.FlowerOfLife:
        this.mainStats = this.getStatsFlowerOfLife();
        break;
      case ArtefactType.GobletOfEnotherm:
        this.mainStats = this.getStatsGobletOfEnotherm();
        break;
      case ArtefactType.PlumeOfDeath:
        this.mainStats = this.getStatsPlumeOfDeath();
        break;
      case ArtefactType.SandsOfEon:
        this.mainStats = this.getStatsSandsOfEon();
        break;

      default:
        break;
    }
  }

  getStatsCircletOfLogos(): Stat[] {
    return this.subStats.filter(stat => {
      return stat.statType === StatType.HPPercentual ||
        stat.statType === StatType.DefPercentual ||
        stat.statType === StatType.AtkPercentual ||
        stat.statType === StatType.ElementalMastery ||
        stat.statType === StatType.CritRate ||
        stat.statType === StatType.CritDamage ||
        stat.statType === StatType.HealingBonusPercentage;
    });
  }

  getStatsFlowerOfLife(): Stat[] {
    return this.subStats.filter(stat => {
      return stat.statType === StatType.BaseHp;
    });
  }

  getStatsGobletOfEnotherm(): Stat[] {
    return this.subStats.filter(stat => {
      return stat.statType === StatType.BaseHp ||
        stat.statType === StatType.DefPercentual ||
        stat.statType === StatType.AtkPercentual ||
        stat.statType === StatType.ElementalMastery ||
        stat.statType === StatType.ElementalDamageBonusPercentage ||
        stat.statType === StatType.PhysicalDamageBonusPercentage;
    });
  }

  getStatsPlumeOfDeath(): Stat[] {
    return this.subStats.filter(stat => {
      return stat.statType === StatType.BaseAtk;
    });
  }

  getStatsSandsOfEon(): Stat[] {
    return this.subStats.filter(stat => {
      return stat.statType === StatType.HPPercentual ||
        stat.statType === StatType.DefPercentual ||
        stat.statType === StatType.AtkPercentual ||
        stat.statType === StatType.ElementalMastery ||
        stat.statType === StatType.EnergyRecharge;
    });
  }
}
