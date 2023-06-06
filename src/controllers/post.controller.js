import Post from '../models/post.schema.js'
import asyncHandler from '../service/asyncHandler.js'
import CustomError from '../utils/CustomError.js'

export const createPost = asyncHandler(async(req,res)=>{
    const {title,text,author} = req.body

    if(!title || !text || !author){
        throw new CustomError('Please provide requireed fields',400)
    }

    const post = await Post.create({
        title,
        text,
        author
    })

    if(!post){
        throw new CustomError('post creation failed',400)
    }

    res.status(200).json({
        success: true,
        message: 'Post created successfully',
        post
    })
})

export const deletePost = asyncHandler(async(req,res)=>{
    const {id:postId} = req.params

    let postToDelete = await Post.findByIdAndRemove(postId)
    
     if(!postToDelete){
         throw new CustomError('cant fetch post to delete',400)
     }
     //ask: giving error postToDelete.remove is not a function
     //postToDelete.remove()
    res.status(200).json({
        success: true,
        message: 'post deleted successfully'
    })
})

export const getPostByAuthor = asyncHandler(async(req,res)=>{
    const {author} = req.params

    const post = await Post.find({author})

    if(!post){
        throw new CustomError('cant find post',400)
    }

    res.status(200).json({
        success: true,
        message: 'post extracted successfull',
        post
    })
})

export const getPost = asyncHandler(async(req,res)=>{
    const {id} = req.params

    const post = await Post.findById(id)

    if(!post){
        throw new CustomError('cant find post',400)
    }

    res.status(200).json({
        success: true,
        message: 'post extracted successfull',
        post
    })
})

export const getAllPost = asyncHandler(async(req,res)=>{
    

    const posts = await Post.find()

    if(!posts){
        throw new CustomError('cant find posts',400)
    }

    res.status(200).json({
        success: true,
        message: 'posts extracted successfull',
        posts
    })
})

export const updatePost = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const{title,text,author} = req.body

    

    // const update = {
    //     title: title? title : post.title,
    //     text: text? text : post.text,
    //     author: author? author : post.author
    // }

    const update = {}

    if(title){
        update.title = title
    }
    if(text){
        update.text = text
    }
    if(author){
        update.author = author
    }

    const response = await Post.findByIdAndUpdate({_id:id},{$set:update})

    if(!response){
        throw new CustomError('post update failed',400)
    }
    
    res.status(200).json({
        success: true,
        message: 'post updation successfull',
        response
    })

})

export const replacePost = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {title,text,author} = req.body

    const query = {_id:id}
    const replace = {
        title,
        text,
        author
    }

    const post = await Post.findOneAndReplace(query,replace)

    if(!post){
        throw new CustomError('post replacement failed',400)
    }

    res.status(200).json({
        success: true,
        message: 'post replacement successfull',
        post
    })
})