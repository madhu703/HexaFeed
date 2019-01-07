import { Component, OnInit } from '@angular/core';
import {RestServiceService} from './../rest-service.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-hexa-posts',
  templateUrl: './hexa-posts.component.html',
  styleUrls: ['./hexa-posts.component.scss']
})
export class HexaPostsComponent implements OnInit {

  posts = []
  addcomment_text = []
  constructor(private http:RestServiceService,private router:Router) { }

  ngOnInit() {
    this.getPosts()    

  }

  getPosts(){
    this.http.getAuth('api/get_all_posts').subscribe(postsData =>{
      console.log(`POSTs RESPONSE IS: ${JSON.stringify(postsData)}`)
      if(postsData.status === 'SUCCESS'){
        this.posts = postsData.body
      }
    })
  }

  updateComment(post,index,value){
    if(!value){
      return ;
    }
    let params = {}
    params['post_id'] = post._id;
    params['comment_message'] = value;

    this.http.postAuth('api/comments_update',params).subscribe((updatedpost)=>{
      console.log(`UPDATED COMMENTS FIELDS ARE ${JSON.stringify(updatedpost)}`)
        if(updatedpost.status === 'SUCCESS'){
          this.getPosts()
        }else{
          console.log(`POST COMMENT IS NOT UPDATED PROPERLY.PLEASE VERIFY ONCE.`)
        }
    })

  }

  
}
