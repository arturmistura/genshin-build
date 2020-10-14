import { Component, Input, OnInit } from '@angular/core';
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
  @Input() artefactType: ArtefactType;

  mainStats: Stat[];
  subStats: Stat[];

  selectedMainStat: Stat;
  selectedSubStats: Stat[] = [new Stat(), new Stat(), new Stat(), new Stat()];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStats().subscribe(stats => {
      this.subStats = stats;
      this.setMainStats();
    });
  }

  selectSubStat(subStat: Stat, slot: number): void {
    this.selectedSubStats[slot] = subStat;
  }

  hasSubStat(subStat: Stat): boolean {
    return (this.selectedMainStat != null && this.selectedMainStat.statType === subStat.statType) ||
      this.selectedSubStats.findIndex(stat => stat.statType === subStat.statType) > -1;
  }

  getRankings(ranking: number): number[] {
    const rankings = [];

    for (let i = 1; i <= ranking; i++) {
      rankings.push(i);
    }

    return rankings;
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
