import { SocialUser } from 'angularx-social-login';
import { Artefact } from './artefact';
import { Character } from './character';
import { Weapon } from './weapon';
import { Vote } from './vote';

export class Build {
  id: string;
  name: string;
  description: string;
  character: Character;
  weapon: Weapon;
  flowerOfLife: Artefact;
  plumeOfDeath: Artefact;
  sandsOfEon: Artefact;
  gobletOfEnotherm: Artefact;
  circletOfLogos: Artefact;
  team: Character[];
  owner: SocialUser;
  votes: Vote[];
}
