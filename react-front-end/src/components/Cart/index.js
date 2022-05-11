import { Container } from "react-bootstrap";
import image from "../../assets/0120424999_6_1_1.webp";
import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/commonData";
import { toast } from "react-toastify";

const Cart = () => {
  const history = useHistory();
  const { userCart, setUserCart } = useData();
  const Taxs = 6.35;

  let total = userCart.reduce((Prev, cur) => {
    return Prev + cur.quantity * cur.price;
  }, 0);

  const deleteItem = (id) => {
    setUserCart((cart) => cart.filter((product) => product.id !== id));
    toast.warning(`Item removed from cart`);
  };

  const Quantity = (val, id) => {
    console.log(userCart);
    setUserCart((cart) => {
      const newCart = [
        ...cart.map((product) => {
          if (product.id === id) {
            //product.quantity = product.quantity + val;
            if (val > 0) product.quantity = val;
            else product.quantity = 1;
          }
          return product;
        }),
      ];
      return newCart;
    });
  };

  /* const Quantity = (val) =>{
      setCart(cart.map((item)=> (item.quantity =item.quantity + val )))
  }*/

  //let total_price = cart.map((product)=> );

  return userCart.length > 0 ? (
    <div className="d-flex flex-row justify-content-between col-12 flex-grow-1 p-3 py-5">
      <div className="d-flex flex-column col-7">
        <div className=" flex-grow-1-scroll  pe-4 my-4  col-12">
          {userCart.map((product) => (
            <CartItem
              key={product.id}
              id={product.id}
              title={product.name}
              Description={product.description}
              price={product.price * product.quantity}
              img={product.image}
              quantity={product.quantity}
              onDelete={deleteItem}
              Quantity={Quantity}
            />
          ))}
        </div>
      </div>

      {userCart.length > 0 ? (
        <div
          className="card mt-4 my-4 "
          style={{ width: "25rem", height: "17rem" }}
        >
          <div className="card-block bg-white py-2 px-2 shadow rounded">
            <h5 className="card-title"> Order Summary</h5>
            {/*<p className="card-text">Item total Store backup</p>
        <h5 className="card-title">Order Summary</h5>*/}
            <hr />
            <div className="card-body">
              <p>
                Item Total{" "}
                <label className="align">
                  EGP{parseFloat(total).toFixed(2)}
                </label>
              </p>
              <p>
                Store pickup <label className="align">FREE</label>
              </p>
              <p>
                Estimated Sales Tax <label className="align"> EGP{Taxs}</label>{" "}
              </p>
            </div>
            <hr />
            <p>
              Total{" "}
              <label className="align">
                EGP{parseFloat(total + Taxs).toFixed(2)}
              </label>
            </p>
            <center>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => {
                  history.push("/checkout");
                }}
                disabled={userCart.length === 0}
              >
                Check out
              </button>
            </center>
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <center className="fs-1 d-flex flex-column h-100 align-items-center justify-content-center">
      Your cart is empty
      <a
        type="button"
        className="btn fs-1 text-primary"
        onClick={() => {
          history.push("/home");
        }}
      >
        Continue Shopping
      </a>
    </center>
  );
};

export default Cart;
