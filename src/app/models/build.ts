import { SocialUser } from 'angularx-social-login';
import { Artefact } from './artefact';
import { Character } from './character';
import { Weapon } from './weapon';
import { Vote } from './vote';
import { Stat } from './stat';
import { ArtefactSet } from './artefact-set';
import { ArtefactBonus } from './artefact-bonus';

export class Build {
  id: string;
  name: string;
  description: string;
  character: Character;
  weapon: Weapon;
  suggestedSets: ArtefactBonus[];
  suggestedMainStats: Stat[];
  suggestedSubStats: Stat[];
  suggestedTeam: Character[];
  owner: SocialUser;
  votes: Vote[];
  date: Date;
}
