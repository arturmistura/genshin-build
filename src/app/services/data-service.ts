import { WeaponType } from '../models/weapon-type';
import { Weapon } from '../models/weapon';
import { Character } from '../models/character';
import { ArtefactSet } from '../models/artefact-set';
import { SlotType } from '../models/slot-type';
import { ArtefactStat } from '../models/artefact-stat';
import { CharacterStat } from '../models/character-stat';
import { Build } from '../models/build';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  private REST_API_SERVER = 'https://localhost:5001/';

  constructor(private httpClient: HttpClient) { }

  private weapons: Weapon[] = [
    { id: 1, name: 'Alley Hunter', type: WeaponType.Bow },
    { id: 2, name: 'Amos\' Bow', type: WeaponType.Bow },
    { id: 3, name: 'Amber Catalyst', type: WeaponType.Catalyst },
    { id: 4, name: 'Apprentice\'s Notes', type: WeaponType.Catalyst },
    { id: 5, name: 'Blackcliff Slasher', type: WeaponType.Claymore },
    { id: 6, name: 'Bloodtainted Greatsword', type: WeaponType.Claymore },
    { id: 7, name: 'Black Tassel', type: WeaponType.Polearm },
    { id: 8, name: 'Blackcliff Pole', type: WeaponType.Polearm },
    { id: 9, name: 'Aquila Favonia', type: WeaponType.Sword },
    { id: 10, name: 'Blackcliff Longsword', type: WeaponType.Sword }
  ];

  private mainStats: ArtefactStat[] = [
    { id: 1, name: 'Base HP', ranking: 3, minValue: 430, maxValue: 1893, slotType: SlotType.FlowerOfLife, isFlatValue: true, characterStat: CharacterStat.BaseHp },
    { id: 2, name: 'Base HP', ranking: 4, minValue: 645, maxValue: 3571, slotType: SlotType.FlowerOfLife, isFlatValue: true, characterStat: CharacterStat.BaseHp },
    { id: 3, name: 'Base HP', ranking: 5, minValue: 717, maxValue: 4780, slotType: SlotType.FlowerOfLife, isFlatValue: true, characterStat: CharacterStat.BaseHp },
    { id: 4, name: 'Base ATK', ranking: 3, minValue: 28, maxValue: 123, slotType: SlotType.PlumeOfDeath, isFlatValue: true, characterStat: CharacterStat.BaseAtk },
    { id: 5, name: 'Base ATK', ranking: 4, minValue: 42, maxValue: 232, slotType: SlotType.PlumeOfDeath, isFlatValue: true, characterStat: CharacterStat.BaseAtk },
    { id: 6, name: 'Base ATK', ranking: 5, minValue: 47, maxValue: 311, slotType: SlotType.PlumeOfDeath, isFlatValue: true, characterStat: CharacterStat.BaseAtk },
    { id: 7, name: 'HP%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 8, name: 'DEF%', ranking: 3, minValue: 6.6, maxValue: 28.8, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 9, name: 'ATK%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 11, name: 'Elemental Mastery', ranking: 3, minValue: 21, maxValue: 92, slotType: SlotType.SandsOfEon, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 12, name: 'Energy Recharge%', ranking: 3, minValue: 5.8, maxValue: 25.6, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.EnergyRecharge },
    { id: 13, name: 'HP%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 14, name: 'DEF%', ranking: 4, minValue: 7.9, maxValue: 43.5, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 15, name: 'ATK%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 16, name: 'Elemental Mastery', ranking: 4, minValue: 25, maxValue: 139, slotType: SlotType.SandsOfEon, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 17, name: 'Energy Recharge%', ranking: 4, minValue: 7, maxValue: 38.7, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.EnergyRecharge },
    { id: 18, name: 'HP%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 19, name: 'DEF%', ranking: 5, minValue: 8.7, maxValue: 28.8, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 20, name: 'ATK%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 21, name: 'Elemental Mastery', ranking: 5, minValue: 29, maxValue: 189, slotType: SlotType.SandsOfEon, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 22, name: 'Energy Recharge%', ranking: 5, minValue: 9, maxValue: 51, slotType: SlotType.SandsOfEon, isFlatValue: false, characterStat: CharacterStat.EnergyRecharge },
    { id: 23, name: 'HP%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 24, name: 'DEF%', ranking: 3, minValue: 6.6, maxValue: 28.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 25, name: 'ATK%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 26, name: 'Elemental Mastery', ranking: 3, minValue: 21, maxValue: 92, slotType: SlotType.GobletOfEnotherm, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 27, name: 'Elemental Damage Bonus%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.ElementalDamageBonusPercentage },
    { id: 28, name: 'Physical Damage Bonus%', ranking: 3, minValue: 6.6, maxValue: 28.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.PhysicalDamageBonusPercentage },
    { id: 29, name: 'HP%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 30, name: 'DEF%', ranking: 4, minValue: 7.9, maxValue: 43.5, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 31, name: 'ATK%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 32, name: 'Elemental Mastery', ranking: 4, minValue: 25, maxValue: 139, slotType: SlotType.GobletOfEnotherm, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 33, name: 'Elemental Damage Bonus%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.ElementalDamageBonusPercentage },
    { id: 34, name: 'Physical Damage Bonus%', ranking: 4, minValue: 7.9, maxValue: 43.5, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.PhysicalDamageBonusPercentage },
    { id: 35, name: 'HP%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 36, name: 'DEF%', ranking: 5, minValue: 8.7, maxValue: 28.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 37, name: 'ATK%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 38, name: 'Elemental Mastery', ranking: 5, minValue: 29, maxValue: 189, slotType: SlotType.GobletOfEnotherm, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 39, name: 'Elemental Damage Bonus%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.ElementalDamageBonusPercentage },
    { id: 40, name: 'Physical Damage Bonus%', ranking: 5, minValue: 8.7, maxValue: 28.8, slotType: SlotType.GobletOfEnotherm, isFlatValue: false, characterStat: CharacterStat.PhysicalDamageBonusPercentage },
    { id: 41, name: 'HP%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 42, name: 'DEF%', ranking: 3, minValue: 6.6, maxValue: 28.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 43, name: 'ATK%', ranking: 3, minValue: 5.2, maxValue: 23.1, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 44, name: 'Elemental Mastery', ranking: 3, minValue: 21, maxValue: 92, slotType: SlotType.CircletOfLogos, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 45, name: 'Crit Rate%', ranking: 3, minValue: 3.5, maxValue: 15.4, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.CritRate },
    { id: 46, name: 'Crit Damage%', ranking: 3, minValue: 7, maxValue: 30.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.CritDamage },
    { id: 47, name: 'Healing Bonus%', ranking: 3, minValue: 4, maxValue: 17.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.HealingBonusPercentage },
    { id: 48, name: 'HP%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 49, name: 'DEF%', ranking: 4, minValue: 7.9, maxValue: 43.5, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 50, name: 'ATK%', ranking: 4, minValue: 6.3, maxValue: 34.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 51, name: 'Elemental Mastery', ranking: 4, minValue: 25, maxValue: 139, slotType: SlotType.CircletOfLogos, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 52, name: 'Crit Rate%', ranking: 4, minValue: 4.2, maxValue: 23.2, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.CritRate },
    { id: 53, name: 'Crit Damage%', ranking: 4, minValue: 8.4, maxValue: 46.4, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.CritDamage },
    { id: 54, name: 'Healing Bonus%', ranking: 4, minValue: 4.8, maxValue: 4.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.HealingBonusPercentage },
    { id: 55, name: 'HP%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 56, name: 'DEF%', ranking: 5, minValue: 8.7, maxValue: 28.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 57, name: 'ATK%', ranking: 5, minValue: 7, maxValue: 23.1, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 58, name: 'Elemental Mastery', ranking: 5, minValue: 29, maxValue: 189, slotType: SlotType.CircletOfLogos, isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 59, name: 'Crit Rate%', ranking: 5, minValue: 5, maxValue: 31, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.CritRate },
    { id: 60, name: 'Crit Damage%', ranking: 5, minValue: 9.3, maxValue: 62.2, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.CritDamage },
    { id: 61, name: 'Healing Bonus%', ranking: 5, minValue: 5.4, maxValue: 35.8, slotType: SlotType.CircletOfLogos, isFlatValue: false, characterStat: CharacterStat.HealingBonusPercentage },
  ];

  private subStats: ArtefactStat[] = [
    { id: 1, name: 'Base HP', isFlatValue: true, characterStat: CharacterStat.BaseHp },
    { id: 2, name: 'Base ATK', isFlatValue: true, characterStat: CharacterStat.BaseAtk },
    { id: 3, name: 'HP%', isFlatValue: false, characterStat: CharacterStat.HPPercentual },
    { id: 4, name: 'DEF%', isFlatValue: false, characterStat: CharacterStat.DefPercentual },
    { id: 5, name: 'ATK%', isFlatValue: false, characterStat: CharacterStat.AtkPercentual },
    { id: 6, name: 'Elemental Mastery', isFlatValue: true, characterStat: CharacterStat.ElementalMastery },
    { id: 7, name: 'Elemental Damage Bonus%', isFlatValue: false, characterStat: CharacterStat.ElementalDamageBonusPercentage },
    { id: 8, name: 'Physical Damage Bonus%', isFlatValue: false, characterStat: CharacterStat.PhysicalDamageBonusPercentage },
    { id: 9, name: 'Crit Rate%', isFlatValue: false, characterStat: CharacterStat.CritRate },
    { id: 10, name: 'Crit Damage%', isFlatValue: false, characterStat: CharacterStat.CritDamage },
    { id: 11, name: 'Healing Bonus%', isFlatValue: false, characterStat: CharacterStat.HealingBonusPercentage },
    { id: 12, name: 'Energy Recharge%', isFlatValue: false, characterStat: CharacterStat.EnergyRecharge },
  ];

  private artefactSets: ArtefactSet[] = [
    {
      id: 1, name: 'Adventurer', bonus: [
        { numberOfPieces: 2, description: 'Max HP increased by 1,000.' },
        { numberOfPieces: 4, description: 'Opening chest regenerates 30% Max HP over 5s.' }
      ]
    },
    {
      id: 2, name: 'Lucky Dog', bonus: [
        { numberOfPieces: 2, description: 'DEF increased by 100.' },
        { numberOfPieces: 4, description: 'Picking up Mora restores 300 HP.' }
      ]
    },
    {
      id: 3, name: 'Traveling Doctor', bonus: [
        { numberOfPieces: 2, description: 'Increases incoming healing by 20%.' },
        { numberOfPieces: 4, description: 'Using Elemental Burst restores 20% HP.' }
      ]
    },
    {
      id: 4, name: 'Retracing Bolide', bonus: [
        { numberOfPieces: 2, description: 'Increases the effectiveness of shields by 35%' },
        { numberOfPieces: 4, description: 'Gain an additional 40% Normal and Charged Attack DMG while under the protection of a shield.' }
      ]
    },
  ];

  private build: Build[] = [
    // {
    //   id: 1,
    //   name: 'Build de test',
    //   character: this.character[9],
    //   weapon: this.weapons[0],
    //   description: 'Descrição de testes',
    //   votes: ,
    //   circletOfLogos: { id: 1, name: 'Artefato 1'},
    //   flowerOfLife: { id: 2, name: 'Artefato 2' },
    //   gobletOfEnotherm: { id: 3, name: 'Artefato 3' },
    //   plumeOfDeath: { id: 4, name: 'Artefato 4' },
    //   sandsOfEon: { id: 5, name: 'Artefato 5' }
    // },
    // {
    //   id: 2,
    //   name: 'Build de test 2',
    //   character: this.character[9],
    //   weapon: this.weapons[0],
    //   description: 'Descrição de testes',
    //   votes: -15,
    //   circletOfLogos: { id: 1, name: 'Artefato 1'},
    //   flowerOfLife: { id: 2, name: 'Artefato 2' },
    //   gobletOfEnotherm: { id: 3, name: 'Artefato 3' },
    //   plumeOfDeath: { id: 4, name: 'Artefato 4' },
    //   sandsOfEon: { id: 5, name: 'Artefato 5' }
    // }
  ];

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.REST_API_SERVER + 'character');
  }

  getWeaponsByType(type: WeaponType): Weapon[] {
    return this.weapons.filter(weapon => {
      return weapon.type === type;
    });
  }

  getArtefactSets(): ArtefactSet[] {
    return this.artefactSets;
  }

  getSlotName(slotType: SlotType): string {
    switch (slotType) {
      case SlotType.FlowerOfLife:
        return 'Flower of Life';
      case SlotType.PlumeOfDeath:
        return 'Plume of Death';
      case SlotType.SandsOfEon:
        return 'Sands of Eon';
      case SlotType.GobletOfEnotherm:
        return 'Goblet of Enotherm';
      case SlotType.CircletOfLogos:
        return 'Circlet of Logos';
      default:
        return '';
    }
  }

  getAllMainStats(): ArtefactStat[] {
    return this.mainStats;
  }

  getMainStatsBySlotType(slotType: SlotType): ArtefactStat[] {
    const result: ArtefactStat[] = [];

    this.mainStats.filter(stat => {
      return stat.slotType === slotType;
    }).forEach(stat => {
      if (result.findIndex(resultStat => resultStat.characterStat === stat.characterStat) === -1) {
        result.push(stat);
      }
    });

    return result;
  }

  getSubStats(): ArtefactStat[] {
    return this.subStats;
  }

  createBuild(build: Build): void {
    this.build.push(build);
  }

  getBuilds(): Build[] {
    return this.build;
  }
}
