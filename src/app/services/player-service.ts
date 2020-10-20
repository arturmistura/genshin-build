import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY } from 'rxjs';
import { map, concatMap, finalize } from 'rxjs/operators';
import { Account } from 'src/app/models/account';
import { environment } from '../../environments/environment';
import { SocialUser } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class PlayerService {

  httpPostOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public httpClient: HttpClient) { }

  login(socialUser: SocialUser): Observable<SocialUser> {
    return this.httpClient.post<SocialUser>(environment.apiUrl + 'player', socialUser, this.httpPostOptions)
      .pipe(map(player => {
        localStorage.setItem('socialUser', JSON.stringify(player));

        return player;
      }));
  }

  logout(): void {
    localStorage.removeItem('socialUser');
  }
}
