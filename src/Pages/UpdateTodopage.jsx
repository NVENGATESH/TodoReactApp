import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Updatepage.css'

export default function Create() {
     const navigate = useNavigate();
  const location = useLocation();
  const todoFromLink = location.state?.todo; 

  
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (todoFromLink) {
      setNewTodo({
        title: todoFromLink.title,
        description: todoFromLink.description,
      });
    }
  }, [todoFromLink]);

  
  const handleInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };


  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!todoFromLink) {
      alert(" No todo found to update!");
      return;
    }

    try {
      const res = await axios.put(
        `https://nishanthtodoapp.onrender.com/api/public/updattobyid/${todoFromLink.id}`,
        newTodo,
        { withCredentials: true }
      );

      alert(" Todo updated successfully!");
      console.log("Updated todo:", res.data);
         navigate("/dashboard");
    } catch (err) {
      console.error(" Failed to update todo:", err);
      alert("Failed to update todo. Try again.");
    }
  };

  return (
    <>
    <div className="updateConatiner">
    <div className="createtodolsi">
      {/* <h2>{todoFromLink ? "Edit Todo" : "Create New Todo"}</h2> */}
<h2>Update Todo</h2>
      <form onSubmit={handleSubmitCreate}>
        <input
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleInputChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {todoFromLink ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
    </div>
    </>
  );
}
