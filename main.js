import { createStore } from 'redux';
import taskReducer from './taskReducer';

const store = createStore(taskReducer);

store.subscribe(() => {
  console.log(store.getState());
  updateList();
});

const taskForm = document.querySelector('#taskForm');
const taskLabel = document.querySelector('#taskLabel');
const taskNote = document.querySelector('#taskNote');

const removeTaskId = document.querySelector('#removeTaskId');
const removeTaskButton = document.querySelector('#removeTaskButton');

const taskList = document.querySelector('#taskList');
const totalTasks = document.querySelector('#totalTask');

//add task
let taskId = 0;
const addTaskHandler = (event) => {
  event.preventDefault();

  if (taskLabel.value && taskNote.value) {
    taskId++;
    store.dispatch({
      type: 'ADD_TASK',
      payload: {
        id: Number(taskId),
        label: taskLabel.value,
        note: taskNote.value,
        completed: false,
      },
    });
  }

  taskLabel.value = '';
  taskNote.value = '';
  store.dispatch({ type: 'TOTAL_TASK' });
};
taskForm.addEventListener('submit', addTaskHandler);

// remove task
const removeTaskHandler = () => {
  if (removeTaskId.value) {
    store.dispatch({
      type: 'REMOVE_TASK',
      payload: Number(removeTaskId.value),
    });
  }
};
removeTaskButton.addEventListener('click', removeTaskHandler);

window.togglerHandler = (taskId) => {
  store.dispatch({ type: 'TOGGLER', payload: taskId });
};

//update
const updateList = () => {
  const state = store.getState();
  taskList.innerHTML = state.tasks
    .map(
      (task) =>
        `<li> 
          <input type="checkbox" id="task-${task.id}" ${
          task.completed ? 'checked' : ''
        } 
            onChange="window.togglerHandler(${task.id})" />
          ${task.id}. ${task.label}: ${task.note}  ${
          task.completed ? ': Completed' : ''
        } 
        </li>`
    )
    .join(' ');
  state.totalTask > 0
    ? (totalTasks.textContent = `Total Tasks: ${state.totalTask}`)
    : '';
};

updateList();
