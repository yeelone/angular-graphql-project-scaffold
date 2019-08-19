import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/injectable/authguard';

const routes: Routes = [
  { path: 'admin/users', loadChildren: () => import(`./pages/user/user.module`).then(m => m.UserModule) , canActivate: [AuthGuard]},
  { path: 'admin/group', loadChildren: () => import(`./pages/group/group.module`).then(m => m.GroupModule ), canActivate: [AuthGuard]},
  { path: 'admin/role', loadChildren: () => import(`./pages/role/role.module`).then(m => m.RoleModule ), canActivate: [AuthGuard]},
  { path: 'admin/config', loadChildren: () => import(`./pages/config/config.module`).then(m => m.ConfigModule ), canActivate: [AuthGuard]},
  { path: 'admin/dashboard', loadChildren: () => import(`./pages/dashboard/dashboard.module`).then(m => m.DashboardModule ), canActivate: [AuthGuard]},
  { path: 'admin/login', component : LoginComponent },
  { path : '', loadChildren: () => import(`./pages/dashboard/dashboard.module`).then(m => m.DashboardModule ) ,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
