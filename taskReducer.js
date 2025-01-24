const inititalState = { tasks: [], totalTask: 0 };

const taskReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        totalTask: state.totalTask + 1,
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        totalTask: state.totalTask - 1,
      };
    case 'TOGGLER':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};
export default taskReducer;
