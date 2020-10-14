import { ArtefactBonus } from './artefact-bonus';
import { ArtefactSet } from './artefact-set';
import { ArtefactType } from './artefact-type';
import { Stat } from './stat';

export class Artefact {
  id: number;
  name: string;
  mainStat: Stat;
  subStat1: Stat;
  subStat2: Stat;
  subStat3: Stat;
  subStat4: Stat;
  artefactSet: ArtefactSet;
  artefactType: ArtefactType;
  artefactBonus: ArtefactBonus[];
}
