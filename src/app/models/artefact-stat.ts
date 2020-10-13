import { SlotType } from './slot-type';
import { CharacterStat } from './character-stat';

export class ArtefactStat {
  id: number;
  name: string;
  ranking?: number;
  slotType?: SlotType;
  minValue?: number;
  maxValue?: number;
  value?: number;
  isFlatValue?: boolean;
  characterStat?: CharacterStat;
}
