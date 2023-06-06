import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import routes from './routes/index.js'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use('/api',routes)

// app.use('/api',(req,res)=>{
//     res.send('api routes working')
// })

app.get('/',(req,res)=>{
    res.send('hello')
})
// app.all('*',(req,res)=>{
//     return res.status(404).json({
//         success:false,
//         message:'route not found'
//     })
// })