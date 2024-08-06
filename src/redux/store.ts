import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Actions/todo.action";

const store: any = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
