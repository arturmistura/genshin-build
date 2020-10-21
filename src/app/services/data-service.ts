import { Weapon } from '../models/weapon';
import { Character } from '../models/character';
import { Stat } from '../models/stat';
import { Build } from '../models/build';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ArtefactSet } from '../models/artefact-set';
import { environment } from '../../environments/environment';
import { SocialUser } from 'angularx-social-login';
import { Player } from '../models/player';

@Injectable()
export class DataService {

  httpPostOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getWeapons(): Observable<Weapon[]> {
    return this.httpClient.get<Weapon[]>(environment.apiUrl + 'weapon');
  }

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(environment.apiUrl + 'character');
  }

  getStats(): Observable<Stat[]> {
    return this.httpClient.get<Stat[]>(environment.apiUrl + 'stat');
  }

  getArtefactSets(): Observable<ArtefactSet[]> {
    return this.httpClient.get<ArtefactSet[]>(environment.apiUrl + 'artefactSet');
  }

  getBuilds(): Observable<Build[]> {
    return this.httpClient.get<Build[]>(environment.apiUrl + 'build');
  }

  getBuildById(id: string): Observable<Build> {
    return this.httpClient.get<Build>(environment.apiUrl + 'build/' + id);
  }

  getBuildByPlayer(owner: Player): Observable<Build[]> {
    return this.httpClient.post<Build[]>(environment.apiUrl + 'build/filter/owner', JSON.stringify(owner), this.httpPostOptions);
  }

  getBuildByCharacter(character: Character): Observable<Build[]> {
    return this.httpClient.post<Build[]>(environment.apiUrl + 'build/filter/character', JSON.stringify(character), this.httpPostOptions);
  }

  saveBuild(build: Build): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'build', build, this.httpPostOptions)
  }
}
