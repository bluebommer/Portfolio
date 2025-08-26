import express from 'express'
import db from '../db.js'

const router = express.Router()
//get all todos from login user
router.get('/', (req,res) => { })

//create a new todo
router.post('/',(req,res) =>{

})
//update todo
router.put('/:id',(req,res) =>{
    
})
//delte a todo
router.delete('/:id',(req,res) =>{
    
})

export default router