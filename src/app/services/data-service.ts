import { Weapon } from '../models/weapon';
import { Character } from '../models/character';
import { Stat } from '../models/stat';
import { Build } from '../models/build';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  private REST_API_SERVER = 'https://localhost:5001/';
  httpPostOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getWeapons(): Observable<Weapon[]> {
    return this.httpClient.get<Weapon[]>(this.REST_API_SERVER + 'weapon');
  }

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.REST_API_SERVER + 'character');
  }

  getStats(): Observable<Stat[]> {
    return this.httpClient.get<Stat[]>(this.REST_API_SERVER + 'stat');
  }

  getBuilds(): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.REST_API_SERVER + 'build');
  }

  filterBuilds(filter: Build): Observable<Build[]> {
    return this.httpClient.post<Build[]>(this.REST_API_SERVER + 'build/filter', JSON.stringify(filter), this.httpPostOptions);
  }
}
