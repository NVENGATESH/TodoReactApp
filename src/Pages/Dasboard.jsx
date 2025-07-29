import { useEffect, useState } from "react";
import { getCurrentUser } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import Create from './UpdateTodopage';
import axios from "axios";
import "./Dashboard.css";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [dateTime, setDateTime] = useState(new Date());
  const [todoToDelete, setTodoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("Not authenticated. Please login.");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get("https://nishanthtodoapp.onrender.com/api/public/todos", { withCredentials: true })
      .then((res) => setTodo(res.data))
      .catch((err) => console.error("Failed to load todos:", err));
  }, []);

  const handleInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  function canceltodo() {
    document.getElementById('createtodid').style.top = "-350px";
  }

  function createtodcomefunction() {
    document.getElementById('createtodid').style.top = "100px";
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://nishanthtodoapp.onrender.com/api/public/todo",
        newTodo,
        { withCredentials: true }
      );
      setTodo((prev) => [...prev, res.data]);
      setNewTodo({ title: "", description: "" });
      canceltodo();
    } catch (err) {
      console.error("Failed to create todo:", err);
      alert("Failed to create todo. Try again.");
    }
  };

  const deletebtn = async (todoId) => {
    try {
      await axios.delete(
        `https://nishanthtodoapp.onrender.com/api/public/deleteByidTodo/${todoId}`,
        { withCredentials: true }
      );
      setTodo((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
      setTodoToDelete(null);
    } catch (err) {
      console.error("❌ Failed to delete todo", err);
      alert("Failed to delete todo. Try again.");
    }
  };

  const toggleCheck = async (todoId) => {
    try {
      await axios.put(
        `https://nishanthtodoapp.onrender.com/api/public/completed/${todoId}`,
        {},
        { withCredentials: true }
      );

      setTodo((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todoId ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error("Failed to toggle todo", err);
      alert("Failed to toggle todo. Try again.");
    }
  };

  return (
    <div className="dashboardcontainer">
      <h2>Todo Dashboard</h2>

      {/* User Info */}
      <div className="userinfodashboard">
        {user ? (
          <div className="userandtimeconatiner">
            <p>
              Hi 👋, <b>{user?.username?.toUpperCase() || "User"}</b>
            </p>
            <div className="createsybol" onClick={createtodcomefunction}>
              <span><FaPlus className="plusicon" /></span>
              <p className="createbtnss">Create</p>
            </div>
            <div className="dateandtime">
              <p>{dateTime.toLocaleDateString()}</p>
              <p>{dateTime.toLocaleTimeString()}</p>
            </div>
          </div>
        ) : (
          <p>Loading user...</p>
        )}
      </div>

      {/* Create Todo Form */}
      <div className="createtodolist" id="createtodid">
        <form onSubmit={handleSubmitCreate}>
          <h5>Create Todo</h5>
          <span className="cancelicon">
            <MdCancel className="cancelicon1" id="cancelbtn" onClick={canceltodo} />
          </span>
          <input
            name="title"
            placeholder="Title"
            value={newTodo.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTodo.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>

      {/* Todo List */}
    <div className="tododeatilsconatiner">
  <h3>Your Todo List</h3>
  {todo.length > 0 ? (
    <div className="todolist">
      {/* Helper function to format date */}
      {(() => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Utility to check if two dates are same day
        const isSameDay = (d1, d2) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

        // Separate todos by date category
        const todosToday = todo.filter(t => {
          const d = new Date(t.date);
          return isSameDay(d, today);
        }).sort((a,b) => b.id - a.id);

        const todosYesterday = todo.filter(t => {
          const d = new Date(t.date);
          return isSameDay(d, yesterday);
        }).sort((a,b) => b.id - a.id);

        const todosEarlier = todo.filter(t => {
          const d = new Date(t.date);
          return d < new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
        }).sort((a,b) => b.id - a.id);

        // Function to render list of todos
        const renderTodos = (arr) => arr.map((a, index) => (
          <div
            className={`eachtodo ${index % 2 === 0 ? 'even' : 'odd'}`}
            key={a.id}
          >
            <input
              type="checkbox"
              checked={a.completed}
              onChange={() => toggleCheck(a.id)}
            />
            {a.completed ? <h2><del>{a.title}</del></h2> : <h2>{a.title}</h2>}
            <div className="todobtnsinside">
              <button onClick={() => setTodoToDelete(a.id)}>Delete</button>
              <button className="creaetebtn">
                <Link to={"/create"} state={{ todo: a }} className="linkbtn">Update</Link>
              </button>
            </div>
          </div>
        ));

        return (
          <>
            {todosToday.length > 0 && <>
              <h4>Today</h4>
              {renderTodos(todosToday)}
            </>}

            {todosYesterday.length > 0 && <>
              <h4>Yesterday</h4>
              {renderTodos(todosYesterday)}
            </>}

            {todosEarlier.length > 0 && <>
              <h4>Earlier</h4>
              {renderTodos(todosEarlier)}
            </>}
          </>
        );
      })()}
    </div>
  ) : (
    <p>No todos yet...</p>
  )}
</div>

      {/* Confirm Delete Dialog */}
      {todoToDelete && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete this todo?</p>
            <div className="confirm-buttons">
              <button onClick={() => deletebtn(todoToDelete)}>Yes, Delete</button>
              <button onClick={() => setTodoToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
