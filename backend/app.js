const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 8080

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(express.static(path.join(__dirname, '../frontend')))

const todosRoutes = require('./router/todos.js')
app.use(todosRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

app.listen(port, () => console.log(`Server listening on port ${port}`))