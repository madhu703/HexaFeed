import { Component, OnInit } from '@angular/core';
import {RestServiceService} from './../rest-service.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  newpost:any ={}
  post_info:string = ''
  constructor(private http:RestServiceService,private router:Router) { }
  ngOnInit() {
  }

  onAddNewPost({invalid,controls}){
    if(invalid){
      return;
    }
    
    this.post_info = null
    this.http.postAuth('api/add_new_post', this.newpost).subscribe((response)=>{
      if(response){
        console.log(`NEW POST UPDATED AND ADD POST RESPONSE IS ${JSON.stringify(response)}`)
        if(response.status === 'SUCCESS'){
          console.log(`New Post Updated Successfully`)
          this.post_info = 'New Post Updated Successfully'
          return this.router.navigate(['/hxd-posts'])
        }
        console.log(`POST ERROR`)
        this.post_info = 'Internal Server Error Occured'
      }
    })
  }
}
