const express = require('express')
const app = express()



const pessoas = [
    { nome: "Reinaldo", idade: 40 },
    { nome: "Julia", idade: 11 },
    { nome: "Henrique", idade: 31 },
    { nome: "Jonas", idade: 44 },
];



app.get('/', (req, res) => {
    console.log("você e muito feio pra ver log")
    return res.send("Servidor está O N L I N E ")
})

app.get('/pessoas', (req, res) => {
    const { id } = req.params
    return res.json(pessoas)
})

app.get('/pessoas/:id', (req, res) => {
    const { id } = req.params
    return res.json(pessoas[id])
})
app.listen(3000)