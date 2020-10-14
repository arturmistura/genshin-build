import { ArtefactBonus } from './artefact-bonus';
import { ArtefactType } from './artefact-type';

export class Artefacts {
  id: number;
  name: string;
  artefactType: ArtefactType;
  artefactBonus: ArtefactBonus[];
}
