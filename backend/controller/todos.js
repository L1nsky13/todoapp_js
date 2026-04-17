const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data.json')

const readData = () => {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(raw)
}

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

// GET /todos
const getAllTodos = (req, res) => {
    const data = readData()
    res.status(200).json(data.todos)
}

// GET /todos/:id
const getTodoById = (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const todo = data.todos.find(t => t.id === id)

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' })
    }
    res.status(200).json(todo)
}

// POST /todos
const createTodo = (req, res) => {
    const data = readData()
    const { title } = req.body

    if (!title) {
        return res.status(400).json({ message: 'Le titre est requis' })
    }

    const newTodo = {
        id: data.todos.length > 0 ? Math.max(...data.todos.map(t => t.id)) + 1 : 1,
        title,
        completed: false
    }

    data.todos.push(newTodo)
    writeData(data)
    res.status(201).json(newTodo)
}

// PUT /todos/:id
const updateTodo = (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const index = data.todos.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    const { title, completed } = req.body
    if (title !== undefined) data.todos[index].title = title
    if (completed !== undefined) data.todos[index].completed = completed

    writeData(data)
    res.status(200).json(data.todos[index])
}

// DELETE /todos/:id
const deleteTodo = (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const index = data.todos.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    const deleted = data.todos.splice(index, 1)
    writeData(data)
    res.status(200).json({ message: 'Todo deleted', todo: deleted[0] })
}

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo }