import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { Build } from './models/build';
import { DataService } from './services/data-service';
import { PlayerService } from './services/player-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'genshin-build';
  user: SocialUser;
  loggedIn: boolean;
  sidenavOpened = false;

  builds: Observable<Build[]>;

  constructor(
    private authService: SocialAuthService,
    public dataService: DataService,
    public playerService: PlayerService,
    public router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(socialUser => {
      if (socialUser != null) {
        this.playerService.login(socialUser).subscribe(su => this.user = su);
      }
    });

    this.refreshBuilds();
  }

  refreshBuilds(): void {
    this.builds = this.dataService.getBuilds();
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  redirectToBuilds(): void {
    this.router.navigate(['/build']);
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.playerService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }
}
