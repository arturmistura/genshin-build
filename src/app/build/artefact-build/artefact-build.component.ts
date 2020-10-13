import { Component, Input, OnInit } from '@angular/core';
import { ArtefactSet } from '../../models/artefact-set';
import { SlotType } from '../../models/slot-type';
import { ArtefactStat } from '../../models/artefact-stat';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-artefact-build',
  templateUrl: './artefact-build.component.html',
  styleUrls: ['./artefact-build.component.scss']
})
export class ArtefactBuildComponent implements OnInit {
  @Input() slot: SlotType;

  mainStats: ArtefactStat[];
  subStats: ArtefactStat[];
  artefactSets: ArtefactSet[];
  selectedSet: ArtefactSet;
  selectedMainStat: ArtefactStat;
  selectedSubStats: ArtefactStat[] = [new ArtefactStat(), new ArtefactStat(), new ArtefactStat(), new ArtefactStat()];
  selectedRanking: number;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.artefactSets = this.dataService.getArtefactSets();
    this.mainStats = this.dataService.getMainStatsBySlotType(this.slot);
    this.subStats = this.dataService.getSubStats();
  }

  selectSubStat(subStat: ArtefactStat, subStatSlot: number): boolean {
    if (!this.hasSubStat(subStat)) {
      this.selectedSubStats[subStatSlot] = subStat;
      return true;
    } else {
      return false;
    }
  }

  hasSubStat(subStat: ArtefactStat): boolean {
    return (this.selectedSubStats.findIndex(stat => {
      return stat.characterStat === subStat.characterStat;
    }) >= 0) ||
      (this.selectedMainStat != null &&
        subStat.characterStat === this.selectedMainStat.characterStat);
  }

  getRankings(ranking: number): number[] {
    const rankings = [];

    for (let i = 1; i <= ranking; i++) {
      rankings.push(i);
    }

    return rankings;
  }
}
