window.addEventListener('load', () => {
    const form = document.querySelector("#task_form");
    const input = document.querySelector("#task_input");
    const list_el = document.querySelector("#task");

    // Load tasks from local storage when the page loads
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const tasks = input.value;
        if (!tasks) {
                alert("Please Input A Task");
                return;
        }

        const task = input.value;

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_action_el = document.createElement('div');
        task_action_el.classList.add('action');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);

        task_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        input.value = '';

        addTaskEventListeners(task_edit_el, task_delete_el, task_input_el);

        // Save tasks to local storage when a new task is added
        saveTasks();
    });

    function saveTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll('.text');
        taskElements.forEach((taskElement) => {
            tasks.push(taskElement.value);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach((task) => {
                const task_el = document.createElement('div');
                task_el.classList.add('task');

                const task_content_el = document.createElement('div');
                task_content_el.classList.add('content');

                task_el.appendChild(task_content_el);

                const task_input_el = document.createElement('input');
                task_input_el.classList.add('text');
                task_input_el.type = 'text';
                task_input_el.value = task;
                task_input_el.setAttribute('readonly', 'readonly');

                task_content_el.appendChild(task_input_el);

                const task_action_el = document.createElement('div');
                task_action_el.classList.add('action');

                const task_edit_el = document.createElement('button');
                task_edit_el.classList.add('edit');
                task_edit_el.innerText = 'Edit';

                const task_delete_el = document.createElement('button');
                task_delete_el.classList.add('delete');
                task_delete_el.innerText = 'Delete';

                task_action_el.appendChild(task_edit_el);
                task_action_el.appendChild(task_delete_el);

                task_el.appendChild(task_action_el);

                list_el.appendChild(task_el);

                addTaskEventListeners(task_edit_el, task_delete_el, task_input_el);
            });
        }
    }

    function addTaskEventListeners(editButton, deleteButton, inputElement) {
        editButton.addEventListener('click', (e) => {
            if (editButton.innerText.toLowerCase() == "edit") {
                editButton.innerText = "Save";
                inputElement.removeAttribute("readonly");
                inputElement.focus();
            } else {
                editButton.innerText = "Edit";
                inputElement.setAttribute("readonly", "readonly");
            }

            saveTasks();
        });

        deleteButton.addEventListener('click', (e) => {
            list_el.removeChild(inputElement.closest('.task'));

            saveTasks();
        });
    }
});
