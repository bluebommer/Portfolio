// the address of this server to the network is
// URL -> http://localhost:3737
const express = require('express')
const app = express()
const PORT = 3737

let data = ['james']
//Middleware
app.use(express.json())
//HTTP Routes and Verbs
app.get('/' ,(req,res) => {

    res.send(`
        <body style = "background: pink; color:blue">
        <h1>DATA</h1>
            <p>
            ${JSON.stringify(data)}
            </p>
        </body`
    )
    

})
app.get('/dashboard', (req,res) =>{
    console.log('ohh i hit the dashborad endpoint')
    res.send('hi')
})

app.get('/api/data', (req,res) =>{
    console.log('this is for data')
    res.send(data)
})
app.post('/api/data', (req, res) =>{
    const newEntry = req.body
    data.push(newEntry.name)
    console.log(data)
    res.sendStatus(201)
})
app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('we deleted the element off the end of the array')
   
    res.sendStatus(203)
})

//CRUD-method Create-post Read-get Update-put Delete-delete,
app.listen(PORT, () => {console.log(`Server has started on :${PORT}`);
})