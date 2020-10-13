import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'genshin-build';
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
