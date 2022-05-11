import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import { useData } from "./contexts/commonData";
import Register from "./components/Login/Register";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user, setUser } = useData();
  return (
    <div className="d-flex flex-column vh-100 ">
      <ToastContainer />
      <Router>
        <NavBar />
        <div className="d-flex flex-column flex-grow-1 px-5 mx-5">
          <Route
            path="/"
            render={() => {
              return <Redirect to={user?.id ? "/home" : "/login"} />;
            }}
          />

          <Route path="/home" render={(params) => <Home />} />
          <Route
            path="/products/:id"
            render={(params) => <ProductDetails {...params} />}
          />
          <Route path="/login" render={(params) => <Login />} />
          <Route path="/register" render={(params) => <Register />} />
          <Route path="/orders" render={(params) => <Orders />} />
          <Route path="/checkout" render={(params) => <Checkout />} />
          <Route path="/cart" render={(params) => <Cart />} />
        </div>
      </Router>
    </div>
  );
};

export default App;
