import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './helpers/auth.guard';
import { BuildDetailComponent } from './build/build-detail/build-detail.component';

const routes: Routes = [
  { path: 'build', component: BuildComponent, canActivate: [AuthGuard] },
  { path: 'build/:id', component: BuildComponent },
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
