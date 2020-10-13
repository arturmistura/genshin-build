import { Artefacts } from './artefacts';
import { Character } from './character';
import { Weapon } from './weapon';

export class Build {
  id: number;
  name: string;
  description: string;
  character: Character;
  weapon: Weapon;
  flowerOfLife: Artefacts;
  plumeOfDeath: Artefacts;
  sandsOfEon: Artefacts;
  gobletOfEnotherm: Artefacts;
  circletOfLogos: Artefacts;
  votes: number;
}
