import mongoose from "mongoose";
import {app } from "./app.js";
import config from "./config/config.js";

(
    async() => {
        try{
            await mongoose.connect("mongodb+srv://abu:d1z4LGsmbQdT0pEH@cluster0.cf77vfd.mongodb.net/blogs?retryWrites=true&w=majority")
            console.log('db connected')
            app.on('error',(err)=>{
                console.log('ERROR:', err)
                throw err
            })
            const onListening = () =>{
                console.log(`listening on port ${config.PORT}`)
            }
            app.listen(config.PORT,onListening)
        }
        catch(err){
            console.error('ERROR cant connect to server',err)
        }
    }
)()