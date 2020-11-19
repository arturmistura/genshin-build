import { Component, NgZone, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { Build } from './models/build';
import { Player } from './models/player';
import { DataService } from './services/data-service';
import { PlayerService } from './services/player-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'genshin-build';
  player: Player;
  loggedIn: boolean;
  sidenavOpened = false;

  builds: Observable<Build[]>;

  constructor(
    private authService: SocialAuthService,
    public dataService: DataService,
    public playerService: PlayerService,
    public zone: NgZone,
    public matIconRegistry: MatIconRegistry,
    public domSanitazer: DomSanitizer,
    public router: Router) { }

  ngOnInit(): void {
    // this.matIconRegistry.addSvgIcon('anemo', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Anemo.svg'));
    // this.matIconRegistry.addSvgIcon('cryo', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Cryo.svg'));
    // this.matIconRegistry.addSvgIcon('dendro', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Dendro.svg'));
    // this.matIconRegistry.addSvgIcon('electro', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Electro.svg'));
    // this.matIconRegistry.addSvgIcon('hydro', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Hydro.svg'));
    // this.matIconRegistry.addSvgIcon('geo', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Geo.svg'));
    // this.matIconRegistry.addSvgIcon('pyro', this.domSanitazer.bypassSecurityTrustResourceUrl('../assets/icons/Element_Pyro.svg'));

    this.player = this.playerService.getPlayer();
    this.playerService.loggedPlayer.subscribe(player => {
      this.player = player;
    });
    this.authService.authState.subscribe(socialUser => {
      if (socialUser != null) {
        this.playerService.login(socialUser).subscribe(player => {
          this.player = player;
        });
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
    this.router.navigate(['/']);
  }
}
