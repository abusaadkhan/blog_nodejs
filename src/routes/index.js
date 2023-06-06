import { Router } from 'express'
import post from './post.route.js'
import auth from './auth.route.js'
const router = Router()

router.use('/post',post)
router.use('/auth',auth)
// router.use('/post',(req,res)=>{
//     res.send('post routes working')
// })


export default router