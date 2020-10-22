import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY, Subject } from 'rxjs';
import { map, concatMap, finalize } from 'rxjs/operators';
import { Account } from 'src/app/models/account';
import { environment } from '../../environments/environment';
import { SocialUser } from 'angularx-social-login';
import { Player } from '../models/player';

@Injectable({ providedIn: 'root' })
export class PlayerService {

  loggedPlayer = new Subject<Player>();

  httpPostOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public httpClient: HttpClient) { }

  login(socialUser: SocialUser): Observable<Player> {
    return this.httpClient.post<Player>(environment.apiUrl + 'player', socialUser, this.httpPostOptions)
      .pipe(map(player => {
        localStorage.setItem('socialUser', JSON.stringify(player));
        this.loggedPlayer.next(player);

        return player;
      }));
  }

  logout(): void {
    localStorage.removeItem('socialUser');
    this.loggedPlayer.next(null);
  }

  getPlayer(): Player {
    const player = localStorage.getItem('socialUser');

    if (player) {
      return JSON.parse(player);
    } else {
      return null;
    }
  }
}
