import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { RestServiceService } from './rest-service.service';
import { LoginComponent } from './login/login.component';
import { HexaPostsComponent } from './hexa-posts/hexa-posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HexaPostsComponent,
    AddPostComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [RestServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
