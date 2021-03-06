import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { DataService } from './services/data-service';
import { ArtefactBuildComponent } from './build/artefact-build/artefact-build.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { TeamBuildComponent } from './build/team-build/team-build.component';
import { ListBuildComponent } from './build/list-build/list-build.component';
import { BuildComponent } from './build/build.component';
import { SearchComponent } from './search/search.component';
import { BuildDescriptionComponent } from './build/build-description/build-description.component';
import { CharacterSelectComponent } from './build/character-select/character-select.component';
import { CharacterPictureComponent } from './build/character-picture/character-picture.component';
import { BuildWeaponComponent } from './build/build-weapon/build-weapon.component';
import { environment } from 'src/environments/environment';
import { BuildDetailComponent } from './build/build-detail/build-detail.component';
import { ArtefactSetDetailComponent } from './components/artefact-set-detail/artefact-set-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtefactBuildComponent,
    TeamBuildComponent,
    ListBuildComponent,
    BuildComponent,
    SearchComponent,
    BuildDescriptionComponent,
    CharacterSelectComponent,
    CharacterPictureComponent,
    BuildWeaponComponent,
    BuildDetailComponent,
    ArtefactSetDetailComponent,
    CommentsComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId)
          },
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
