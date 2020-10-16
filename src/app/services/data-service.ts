import { Weapon } from '../models/weapon';
import { Character } from '../models/character';
import { Stat } from '../models/stat';
import { Build } from '../models/build';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArtefactSet } from '../models/artefact-set';
import { environment } from '../../environments/environment';

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

  filterBuilds(filter: Build): Observable<Build[]> {
    return this.httpClient.post<Build[]>(environment.apiUrl + 'build/filter', JSON.stringify(filter), this.httpPostOptions);
  }

  saveBuild(build: Build): void {
    this.httpClient.post(environment.apiUrl + 'build', build, this.httpPostOptions)
      .subscribe();
  }
}
