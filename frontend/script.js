const urlAPI = 'http://localhost:8080'

function showError(msg) {
    const el = document.getElementById('error-msg')
    el.textContent = msg
    setTimeout(() => el.textContent = '', 3000)
}

function getAllTodos() {
    fetch(urlAPI + '/todos')
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la récupération des tâches')
            return res.json()
        })
        .then(todos => renderTodos(todos))
        .catch(err => showError(err.message))
}

function renderTodos(todos) {
    const list = document.getElementById('todos-list')
    list.innerHTML = ''

    if (todos.length === 0) {
        list.innerHTML = '<p style="color:#aaa; text-align:center;">Aucune tâche pour le moment !</p>'
        return
    }

    todos.forEach(todo => {
        const div = document.createElement('div')
        div.className = 'todo-item' + (todo.completed ? ' done' : '')

        div.innerHTML = `
            <span>${todo.title}</span>
            <button 
                class="toggle-btn ${todo.completed ? 'reopen' : ''}" 
                onclick="toggleTodo(${todo.id}, ${todo.completed})">
                ${todo.completed ? 'Rouvrir' : 'Terminer'}
            </button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                Supprimer
            </button>
        `
        list.appendChild(div)
    })
}

function createTodo() {
    const input = document.getElementById('new-todo')
    const title = input.value.trim()

    if (!title) {
        showError('Le titre ne peut pas être vide !')
        return
    }

    fetch(urlAPI + '/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la création')
            return res.json()
        })
        .then(() => {
            input.value = ''
            getAllTodos()
        })
        .catch(err => showError(err.message))
}

function toggleTodo(id, currentStatus) {
    fetch(urlAPI + '/todos/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
    })
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la modification')
            return res.json()
        })
        .then(() => getAllTodos())
        .catch(err => showError(err.message))
}

function deleteTodo(id) {
    fetch(urlAPI + '/todos/' + id, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la suppression')
            return res.json()
        })
        .then(() => getAllTodos())
        .catch(err => showError(err.message))
}

document.getElementById('add-btn').addEventListener('click', createTodo)

document.getElementById('new-todo').addEventListener('keydown', e => {
    if (e.key === 'Enter') createTodo()
})

getAllTodos()