let tasks = []

fetch('tasks.json')
    .then(res => {
        return res.json()}
    )
    .then(data => { 
            tasks = data
            renderTask(tasks)
        }
    )


const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const task = {}

    formData.forEach((value, key) => {
        task[key] = value;
    });

    addTask(task)    

    form.reset();

})

function renderTask(tasks) {
    const container = document.getElementById('tasks')
    container.innerHTML = ''

    console.log(tasks)
    tasks.forEach(task => {
        const cardTask = document.createElement('div')
        
        cardTask.className = 'task-card'
        cardTask.innerHTML = `
            <h1>${task.label}</h1>
            <h2>${task.description}</h2>
            <div>
                <p>Ответвенный: ${task.lastName} ${task.name} ${task.patronymic}</p>
            </div>
            <button class="buttonDelete" data-id="${task.id}">Удалить задачу</button>
        `

        container.appendChild(cardTask)
    })

    const deleteButtons = container.querySelectorAll('.buttonDelete')
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id')
            deleteTask(Number(id))
        })
    })
}

function addTask(task) {
    tasks.push({...task, id: tasks.length + 1})
    renderTask(tasks)
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId)
    renderTask(tasks)
}

