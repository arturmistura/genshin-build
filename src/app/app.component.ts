import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { Build } from './models/build';
import { DataService } from './services/data-service';

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

  constructor(private authService: SocialAuthService,
    public dataService: DataService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
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
}
