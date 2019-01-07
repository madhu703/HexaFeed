'use strict'
const PostsModel = require('./../models/PostsModel')
const mongoose = require('mongoose')
let PostsService = module.exports


// Adding New Post to user

PostsService.addNewPost = (apiReq, apiRes) => {
    let insertDataPost = new PostsModel()
    insertDataPost.user_id = mongoose.Types.ObjectId(apiReq.user.id)
    insertDataPost.post_title = apiReq.body.title
    insertDataPost.post_message = apiReq.body.message
    insertDataPost.save()
        .then(post => {
            return apiRes.send({ 'error': false, status: 'SUCCESS', 'body': post })
        })
        .catch(err => {
            console.log(`ADD NEW POST ERR: ${err}`)
            return apiRes.send({ 'error': 'Internal Server Errror', status: 'DBERR' })
        })
}

PostsService.getAllPosts = (apiReq, apiRes) => {
    PostsModel.find({}, (postErr, postData) => {
        if (postErr) {
            console.log(`GET ALL POSTS ERROR ${postErr}`)
            return apiRes.send({ 'error': 'Internal Server Errror', status: 'DBERR' })
        }
        return apiRes.send({ error: false, status: 'SUCCESS', 'body': postData })
    })
}

PostsService.updateComments = (apiReq, apiRes) => {
    let postFilter = {}
    postFilter._id = apiReq.body.post_id

    let updateFields = {
        $push: {
            comments:{
                message: apiReq.body.comment_message,
                commented_date: Date.now(),
                commented_user_id: mongoose.Types.ObjectId(apiReq.user.id),
                commented_username: apiReq.user.name
            }
        }
    }
    // updateFields.comments.$push({
    //     message: apiReq.body.comment_message,
    //     commented_date: Date.now,
    //     commented_user_id: mongoose.Types.ObjectId(apiReq.user.id),
    //     commented_username: apiReq.user.name
    // })
    PostsModel.findOneAndUpdate(postFilter, updateFields, { new: true },(postUpdateErr, postUpdateData)=> {
        if(postUpdateErr) {
            return apiRes.send({ error: 'Internal Server Error', status: 'DBERR' })
        }
        return apiRes.send({ error: false, status: 'SUCCESS', body: postUpdateData })
    })
}