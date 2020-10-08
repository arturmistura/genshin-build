import { Component } from '@angular/core';
import { Character } from './models/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'genshin-build';
  picBasePath = 'https://rerollcdn.com/GENSHIN/Characters/';
  picExtension = '.png';
  selectedCharacter: Character = new Character();

  characters: Character[] = [
    { id: 1, name: 'Keqing'},
    { id: 2, name: 'Mona'},
    { id: 3, name: 'Qiqi'},
    { id: 4, name: 'Sucrose'},
    { id: 5, name: 'Amber'},
    { id: 6, name: 'Barbara'},
    { id: 7, name: 'Beidou'},
    { id: 8, name: 'Bennett'},
    { id: 9, name: 'Chongyun'},
    { id: 10, name: 'Diluc'},
    { id: 11, name: 'Fischl'},
    { id: 12, name: 'Jean'},
    { id: 13, name: 'Kaeya'},
    { id: 14, name: 'Klee'},
    { id: 15, name: 'Lisa'},
    { id: 16, name: 'Ningguang'},
    { id: 17, name: 'Noelle'},
    { id: 18, name: 'Razor'},
    { id: 19, name: 'Traveler (Anemo)'},
    { id: 20, name: 'Traveler (Geo)'},
    { id: 21, name: 'Venti'},
    { id: 22, name: 'Xiangling'},
    { id: 23, name: 'Xiao'},
    { id: 24, name: 'Xingqiu'}
  ];
}
