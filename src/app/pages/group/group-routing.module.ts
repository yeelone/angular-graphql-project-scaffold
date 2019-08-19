import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: GroupComponent,},
  { path: ':id/users', component : UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {
}