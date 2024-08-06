import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  task: string;
  isChecked: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: Date.now(),
        task: action.payload,
        isChecked: false,
      };
      state.todos.push(newTask);
    },
    toggelTask: (state, action: PayloadAction<number>) => {
      const task = state.todos.find((task) => task.id === action.payload);
      if (task) {
        task.isChecked = !task.isChecked;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: number; task: string }>
    ) => {
      const { id, task } = action.payload;
      const todo = state.todos.find((task) => task.id === id);

      if (todo) {
        todo.task = task;
      }
    },
  },
});

export const { addTask, deleteTask, toggelTask, updateTask } =
  TodoSlice.actions;

export default TodoSlice.reducer;
