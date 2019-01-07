import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestServiceService {
  apiurl: string = environment.api_url;

  constructor(private http: Http, private router: Router) { }
  post(url, body) {
    return this.http.post(this.apiurl + url, body)
      .pipe(map(res => res.json()));
  }

  get(url) {
    return this.http.get(this.apiurl + url)
      .pipe(map(res =>
        res.json()
      ));
  }
  getAuth(url) {
    console.log("this.apiurl", this.apiurl);
    const headers = new Headers();
    const token = localStorage.getItem('hd_auth_token');
    headers.append('hxd-access-token', token);
    const opts = new RequestOptions();
    opts.headers = headers;
    return this.http.get(this.apiurl + url, opts)
      .pipe(map(res => res.json()));
  }

  getAuthParams(url, params) {
    const headers = new Headers();
    const token = localStorage.getItem('hd_auth_token');
    headers.append('hxd-access-token', token);
    const opts = new RequestOptions();
    opts.headers = headers;
    opts.params = params;

    return this.http.get(this.apiurl + url, opts)
      .pipe(map(res => res.json()));
  }

  postAuth(url, body) {
    const headers = new Headers();
    const token = localStorage.getItem('hd_auth_token');
    headers.append('hxd-access-token', token);
    const opts = new RequestOptions();
    opts.headers = headers;
    return this.http.post(this.apiurl + url, body, opts)
      .pipe(map(res => res.json()));
  }
}
