import { useState } from "react";
import { MdDone, MdEdit, MdDelete } from "react-icons/md";
import { ToastContainer, toast , Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (input.trim() === "") {
        toast.error('Please enter a valid todo', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
      return;
    }

    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput(""); 
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    setInput(taskToEdit.text);
    handleDelete(id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button type="submit">ADD</button>
      </form>
      <div>
        <ul className="list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{todo.text}</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <MdDone
                  onClick={() => handleComplete(todo.id)}
                  style={{ color: "green", cursor: "pointer" }}
                  title="Mark as Completed"
                />
                <MdEdit
                  onClick={() => handleEdit(todo.id)}
                  style={{ color: "blue", cursor: "pointer" }}
                  title="Edit Task"
                />
                <MdDelete
                  onClick={() => handleDelete(todo.id)}
                  style={{ color: "red", cursor: "pointer" }}
                  title="Delete Task"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Todo;
