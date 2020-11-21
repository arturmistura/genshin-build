import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildCreateComponent } from './build/build-create/build-create.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './helpers/auth.guard';
import { BuildDetailComponent } from './build/build-detail/build-detail.component';

const routes: Routes = [
  { path: 'build', component: BuildCreateComponent, canActivate: [AuthGuard] },
  { path: 'build/:id', component: BuildCreateComponent },
  { path: 'build/details/:id', component: BuildDetailComponent },
  { path: '', component: SearchComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
