import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { DataService } from './services/data-service';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { SearchComponent } from './search/search.component';
import { environment } from 'src/environments/environment';
import { BuildDetailComponent } from './build/build-detail/build-detail.component';
import { ArtefactSetDetailComponent } from './components/artefact-set-detail/artefact-set-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { BuildCreateComponent } from './build/build-create/build-create.component';
import { BuildListComponent } from './build/build-list/build-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildCreateComponent,
    SearchComponent,
    BuildDetailComponent,
    ArtefactSetDetailComponent,
    CommentsComponent,
    AddCommentComponent,
    BuildCreateComponent,
    BuildListComponent
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
