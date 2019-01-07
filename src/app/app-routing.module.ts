import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HexaPostsComponent } from './hexa-posts/hexa-posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AuthGuard } from './guards/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hxd-posts', component: HexaPostsComponent, canActivate: [AuthGuard] },
  { path: 'hxd-add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
