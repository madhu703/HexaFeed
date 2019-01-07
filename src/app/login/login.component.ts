import { Component, OnInit } from '@angular/core';
import { RestServiceService } from './../rest-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_data: any = {};
  login_errors: any = {};
  constructor(private httpService: RestServiceService, private router: Router) { }

  ngOnInit() {
    console.log(`WELCOME TO LOGIN`);
  }

  onLogin({ invalid, controls }) {
    if (invalid) {
      this.login_errors.sub_err = 'Please Enter All fields*';
      return;
    }
    console.log('login data', this.login_data);
    this.httpService.post('api/login', this.login_data).subscribe(response => {
      if (response.error) {
        this.login_errors.sub_err = response.message;
        return;
      }
      localStorage.setItem('hd_auth_token', response.data.login_token);
      console.log('login response is:', response);
      this.router.navigate(['/hxd-posts']);
      return ;
    });
  }
}
