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
        console.log(task)

    addTask(task)    

    form.reset();

})

function renderTask(tasks) {
    const container = document.getElementById('tasks');
    container.innerHTML = '';

    tasks.forEach(task => {
        console.log('rer')
        const cardTask = document.createElement('div');
        cardTask.className = 'task-card';

        const iconHeart = task.isFavourite ? 'fa-solid' : 'fa-regular';

        cardTask.innerHTML = `
            <i class="${iconHeart} fa-heart favourite-icon" data-id="${task.id}"></i>
            <h1>${task.label}</h1>
            <h2>${task.description}</h2>
            <div>
                <p>Ответвенный: ${task.lastName} ${task.name} ${task.patronymic}</p>
            </div>
            <button class="buttonDelete" data-id="${task.id}">Удалить задачу</button>
        `;

        cardTask.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('favourite-icon')) {
                const id = Number(target.getAttribute('data-id'));
                const currentTask = tasks.find(t => t.id === id);
                if (currentTask) {
                    currentTask.isFavourite = !currentTask.isFavourite;

                    target.classList.toggle('fa-solid', currentTask.isFavourite);
                    target.classList.toggle('fa-regular', !currentTask.isFavourite);
                }
            }

            if (target.classList.contains('buttonDelete')) {
                const id = Number(target.getAttribute('data-id'));
                deleteTask(id);
            }
        });

        container.appendChild(cardTask);
    });
}

function addTask(task) {
    const newId = tasks.length + 1;
    const newTask = {...task, id: newId, isFavourite: false};
    tasks.push(newTask);    

    const container = document.getElementById('tasks')
    const newTaskCard = document.createElement('div')
    newTaskCard.className = 'task-card';

    newTaskCard.innerHTML = `
        <i class="fa-regular fa-heart favourite-icon" data-id="${newId}"></i>
        <h1>${task.label}</h1>
        <h2>${task.description}</h2>
        <div>
            <p>Ответвенный: ${task.lastName} ${task.name} ${task.patronymic}</p>
        </div>
        <button class="buttonDelete" data-id="${newId}">Удалить задачу</button>
    `;

    newTaskCard.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('favourite-icon')) {
                const currentTask = tasks.find(t => t.id === newId);
                if (currentTask) {
                    currentTask.isFavourite = !currentTask.isFavourite;

                    target.classList.toggle('fa-solid', currentTask.isFavourite);
                    target.classList.toggle('fa-regular', !currentTask.isFavourite);
                }
            }

            if (target.classList.contains('buttonDelete')) {
                deleteTask(newId);
            }
        });

    container.appendChild(newTaskCard)
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);

    const container = document.getElementById('tasks');
    const cardToRemove = container.querySelector(`.task-card button[data-id="${taskId}"]`)?.parentElement;
    if (cardToRemove) {
        container.removeChild(cardToRemove);
    }
}


