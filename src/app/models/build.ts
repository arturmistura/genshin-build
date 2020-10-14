import { Artefact } from './artefact';
import { Character } from './character';
import { Weapon } from './weapon';

export class Build {
  id: number;
  name: string;
  description: string;
  character: Character;
  weapon: Weapon;
  flowerOfLife: Artefact;
  plumeOfDeath: Artefact;
  sandsOfEon: Artefact;
  gobletOfEnotherm: Artefact;
  circletOfLogos: Artefact;
  votes: number;
  team: Character[];
}
