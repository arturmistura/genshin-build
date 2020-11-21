import { Weapon } from '../models/weapon';
import { Character } from '../models/character';
import { Stat } from '../models/stat';
import { Build } from '../models/build';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArtefactSet } from '../models/artefact-set';
import { environment } from '../../environments/environment';
import { Player } from '../models/player';
import { Comment } from '../models/comment';
import { map } from 'rxjs/operators';
import { Vote } from '../models/vote';

@Injectable()
export class DataService {
  buildComments = new BehaviorSubject<Comment[]>(null);

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
    if (build && build.id) {
      return this.httpClient.put(environment.apiUrl + 'build', build, this.httpPostOptions);
    } else {
      return this.httpClient.post(environment.apiUrl + 'build', build, this.httpPostOptions);
    }
  }

  addComment(comment: Comment): Observable<any> {
    return this.httpClient.post<Comment>(environment.apiUrl + 'comment', comment, this.httpPostOptions)
      .pipe(map((cm) => {
        const values = this.buildComments.value;
        values.push(cm);
        this.buildComments.next(values);
      }));
  }

  getComments(buildId: number): BehaviorSubject<Comment[]> {
    this.httpClient.get<Comment[]>(environment.apiUrl + 'comment/' + buildId)
      .subscribe(comments => {
        this.buildComments.next(comments);
      });

    return this.buildComments;
  }

  getVotesNumber(votes: Vote[]): number {
    if (votes) {
      const upvotes = votes.filter(vote => vote.isUpvote).length;
      const downvotes = votes.filter(vote => !vote.isUpvote).length;

      return upvotes - downvotes;
    } else {
      return 0;
    }
  }

  addVote(vote: Vote): Observable<Vote> {
    return this.httpClient.post<Vote>(environment.apiUrl + 'vote', vote, this.httpPostOptions);
  }

  removeVote(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(environment.apiUrl + 'vote/' + id);
  }

  deleteBuild(build: Build): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'build/' + build.id);
  }
}
