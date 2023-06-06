import { Router } from 'express'
import { createPost, deletePost, getPost, getAllPost,getPostByAuthor, updatePost, replacePost } from '../controllers/post.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'


const router = Router()
//(ans 3)
router.post('/createpost',createPost)
router.post('/updatepost/:id',updatePost )
router.post('/replacepost/:id',replacePost )
router.delete("/deletepost/:id", deletePost )




router.get('/:author',getPostByAuthor)
//ask: route.get('/:id',getPost) sometime fails to respond why?????

// only authorized user can access post here we are using middleware isLoggedIn before executing getPost (ans 2)
router.get('/id/:id', isLoggedIn ,getPost)

router.get('/allpost',getAllPost)




export default router