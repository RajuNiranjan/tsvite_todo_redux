import { FormEvent, useState } from "react";
import {
  addTask,
  deleteTask,
  toggelTask,
  updateTask,
} from "./redux/Actions/todo.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todos);

  const OnSubmitTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() === "") return;
    try {
      if (editingTaskId) {
        dispatch(updateTask({ id: editingTaskId, task }));
        setEditingTaskId(null);
      } else {
        dispatch(addTask(task));
      }
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggelTask(id));
  };

  const handleEditTask = (id: number, task: string) => {
    setTask(task);
    setEditingTaskId(id);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <form
          onSubmit={OnSubmitTask}
          className="w-[450px] bg-white p-4 rounded-lg shadow-lg"
        >
          <div className="flex justify-between gap-2 items-center">
            <input
              type="text"
              name="task"
              id="task"
              className="p-3 border rounded-lg w-full"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="p-3 rounded-lg  bg-lime-500 text-white font-semibold">
              {editingTaskId ? "Update" : "Add"}
            </button>
          </div>
        </form>{" "}
        <div>
          {todo.todos?.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleToggleTask(item.id)}
                />
                <h1
                  style={{
                    textDecoration: item.isChecked ? "line-through" : "none",
                  }}
                >
                  {item.task}
                </h1>
              </div>
              <div>
                <small
                  className="text-lime-500 cursor-pointer"
                  onClick={() => handleEditTask(item.id, item.task)}
                >
                  edit
                </small>{" "}
                <small
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  delete
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
