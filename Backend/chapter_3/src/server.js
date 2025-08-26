import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
const app = express()
const PORT = process.env.PORT || 5000
// get the path from the url of the current module
const __filename = fileURLToPath(import.meta.url)
//get directory name fropm the url path
const __dirname = dirname(__filename)
//serves the html file from /public directory and tell express to serve all files as static assets
app.use(express.static(path.join(__dirname, '../public')))

app.use(express.json())

//serving the html path
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.use('/auth', authRoutes) 
app.use('/todos', todoRoutes) 

app.listen(PORT,()=>{
    console.log(`Server has started on ${PORT}`);
    
})


