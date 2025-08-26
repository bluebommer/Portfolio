import express from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import db from '../db.js';
import { log } from 'console';

const router = express.Router()

router.post('/register', (req,res)=>{
const {username,password} = req.body
    console.log(username,password);
 const hashedPassword = bcrypt.hashSync(password, 8)
    try{
        const insertUser = db.prepare(`INSERT INTO users(username,password)
            VALUES (?,?)`)
            const result = insertUser.run(username,hashedPassword)


            //add their first todo by default
            const defaultTodo = `Hello :) Add your first todo`
            const InsertTodo = db.prepare(`INSERT INTO todos(user_id, task)
                VALUES(?,?)`)
                InsertTodo.run(result.lastInsertRowid, defaultTodo)
                //create a token
                const token = jwt.sign({id:result.lastInsertRowid}, process.env.JWT_SECERET, {expiresIn:'24h'})
                res.json({token})
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(503)
    }
  
   

})
router.post('/login', (req,res) =>{
  const {username,password} = req.body
    try{
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if(!user){
            return res.status(404).send({message: 'user not found'})
        }
    }
    catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router
