import { Component, OnInit } from '@angular/core';
import { RestServiceService } from './../rest-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  signup_data: any = {};
  signup_errors: any = {};
  constructor(private HttpService: RestServiceService, private router: Router) { }

  ngOnInit() {
  }


  onSignup({ invalid, controls }) {
    console.log('controls:', controls);
    if (invalid) {
      this.signup_errors.sub_err = 'Please Provide All Details';
      return;
    }
    if (this.signup_data.password !== this.signup_data.conform_password) {
      this.signup_errors.mismatch_pwd = 'Passwords did not match!';
      return;
    }
    console.log(`SIGNUP DATA${this.signup_data}`);
    this.HttpService.post('api/signup', this.signup_data).subscribe(response => {
      if (response.error) {
        this.signup_errors.sub_err = response.message;
        return;
      }
      this.signup_errors.sub_err = response.data.data;
      console.log(`Response on Signup: ${response}`);
      return this.router.navigate(['/login']);
    });
  }
}
