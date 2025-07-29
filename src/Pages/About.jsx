import React from "react";
import "./About.css"; // optional for custom styling

export default function About() {
  return (
    <><div className="AboutwholeContainet">
      
      <div className="about-container">
      <h1>About This Todo App</h1>
      <p>
        This is my first full-stack web application built using <strong>React</strong> for the frontend and <strong>Spring Boot</strong> for the backend. It’s a simple yet powerful Todo application designed to help users manage their daily tasks efficiently.
      </p>

      <h2>Tech Stack</h2>
      <ul>
        <li>Frontend: React, Axios, React Router</li>
        <li>Backend: Spring Boot, Spring Security, JPA</li>
        <li>Authentication: JWT Token-based</li>
        <li>Database: MySQL</li>
      </ul>

      <h2>Features</h2>
      <ul>
        <li>User Registration & Login</li>
        <li>Create, Update, Delete Todos</li>
        <li>Mark Todos as Completed</li>
        <li>JWT Protected Routes</li>
        <li>Responsive and Clean UI</li>
      </ul>

      <h2>What I Learned</h2>
      <p>
        This project helped me understand full-stack architecture, API integration, JWT authentication, CRUD operations, and styling with React.
      </p>

      <h2>Future Improvements</h2>
      <ul>
        <li>Due Dates and Reminders</li>
        <li>Filter by Date or Completion</li>
       
      
      </ul>
    </div>
      </div></>
    
  );
}
