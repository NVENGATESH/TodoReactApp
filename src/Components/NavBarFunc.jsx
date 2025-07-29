import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { forwardRef, useEffect, useState } from "react";

function NavBarFunc({ userName, userEmail,clearUser  }) {
  const navigate = useNavigate();
  const [localUserName, setLocalUserName] = useState("User");
  const [localUserEmail, setLocalUserEmail] = useState("user@gmail.com");
  const userAvatar = "https://static.thenounproject.com/png/363640-200.png";

  useEffect(() => {
    setLocalUserName(userName);
    setLocalUserEmail(userEmail);
  }, [userName, userEmail]);

  const logoutUser = async () => {
    return fetch("https://nishanthtodoapp.onrender.com/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();   
      alert("Logged out.");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Failed to logout. Try again.");
    }
  };


  const AvatarToggle = forwardRef(({ onClick }, ref) => (
    <Image
      ref={ref}
      src={userAvatar}
      roundedCircle
      width="40"
      height="40"
      alt="User Avatar"
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  return (
    <Navbar expand="md" bg="light" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>

            <Dropdown align="end">
              <Dropdown.Toggle as={AvatarToggle} />
              <Dropdown.Menu className="p-3 text-center">
                <Image src={userAvatar} roundedCircle width="60" height="60" className="mb-2" />
                <h6 className="mb-0">{localUserName}</h6>
                <small className="text-muted">{localUserEmail}</small>
                <Dropdown.Divider />
                <button className="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarFunc;
