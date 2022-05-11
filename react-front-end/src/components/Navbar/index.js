import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useData } from "./../../contexts/commonData";
import { useState } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const NavBar = () => {
  const [currentPage, setCurrentPage] = useState("/home");
  const history = useHistory();
  const { user, setUser, userCart } = useData();
  return (
    <Navbar
      className={`px-2 px-md-5  navbar bg-primary text-center align-items-center sticky-top ${
        user?.id ? " " : " d-none"
      }`}
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand
        onClick={() => {
          history.push("/home");
          setCurrentPage("/home");
        }}
      >
        <img
          src={logo}
          style={{
            height: "55px",
          }}
        />
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link
          className="fs-4"
          onClick={() => {
            history.push("/orders");
            setCurrentPage("/orders");
          }}
          active={currentPage === "/orders"}
        >
          Orders
        </Nav.Link>
        <Nav.Link
          className="fs-4"
          onClick={() => {
            history.push("/cart");
            setCurrentPage("/cart");
          }}
          active={currentPage === "/cart"}
        >
          Cart{" "}
          <Badge badgeContent={userCart.length ?? 0} color="secondary">
            <ShoppingCart />
          </Badge>
        </Nav.Link>
      </Nav>

      <label className="text-white mx-3 fs-3 fw-bold text-capitalize">
        {user?.email?.replace("@gmail.com", "")}
      </label>

      <i
        class="fa fa-sign-out fs-1 text-danger"
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/login");
          setUser({});
        }}
      />
    </Navbar>
  );
};

export default NavBar;
