import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import image from "../../assets/visas_logos.png";
import imag from "../../assets/see-the-source-image-cash-on-delivery-now-available-11563353301vi2pno7jfy.png";
import { useData } from "./../../contexts/commonData";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const { userCart, setUserCart, orders, setOrders, user } = useData();
  const Tax = 6.35;

  const history = useHistory();

  const total = userCart.reduce((Prev, cur) => {
    return Prev + cur.quantity * cur.price;
  }, 0);

  const handleCheckout = () => {
    setOrders([
      {
        products: [...userCart],
        orderId: orders.length + 1,
        status: "pending",
        total: total,
        userId: user.id,
      },
      ...orders,
    ]);
    setUserCart([]);
    toast.success("Order Placed Successfully");
    history.push("/home");
  };

  return (
    <div className="checkout">
      <div className="col-6 left">
        <h4>Getting your order</h4>
        <hr />
        <h6>Shipping information</h6>
        <div className="col-5">
          <Form>
            <Form.Group className="form-group">
              <b>First Name</b>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="form-group">
              <b>Last Name</b>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="form-group">
              <b>Address</b>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="form-group">
              <b>City</b>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="form-group">
              <b>Zip code</b>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
          <Form.Check type="checkbox" className="form-group" />
          <small>Save this as my billing Address</small>
        </div>
        <hr />

        <h4>Contact Information</h4>
        <div className="col-6">
          <Form>
            <Form.Group className="form-group">
              <b>Email Address:</b>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="form-group">
              <b>Phone Number:</b>
              <Form.Control type="email" />
            </Form.Group>
          </Form>
        </div>
      </div>

      <div
        className="card mx-3 my-4 right"
        style={{ width: "25rem", height: "17rem" }}
      >
        <div className="card-block bg-white py-2 px-2 ">
          <Container>
            <h5 className="card-title"> Order Summary</h5>
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
                Estimated Sales Tax <label className="align"> EGP{Tax}</label>{" "}
              </p>
            </div>
            <hr />
            <p>
              Total{" "}
              <label className="align">
                EGP{parseFloat(total + Tax).toFixed(2)}
              </label>
            </p>
          </Container>
        </div>
      </div>
      <div
        className="card mt-4 my-4 right"
        style={{ width: "25rem", height: "17rem" }}
      >
        <div className="card-block bg-white py-2 px-2 ">
          <Container>
            <h5 className="card-title"> Payment Method</h5>
            <hr />
            <p>How do you want to pay for your order?</p>

            <div class="form-check">
              <img src={image} width={80} height={30} />
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                By credit card
              </label>

              <Form>
                <Form.Group className="form-group">
                  <b>Card Number</b>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <b>Card Holder Name</b>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <b>CVV</b>
                  <Form.Control type="text" />
                </Form.Group>
              </Form>
              <h6>Expired Date</h6>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Year</option>
                <option value="1">2023</option>
                <option value="2">2024</option>
                <option value="3">2025</option>
                <option value="4">2026</option>
                <option value="5">2027</option>
                <option value="6">2028</option>
                <option value="7">2029</option>
                <option value="8">2030</option>
              </select>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Month</option>
                <option value="1">1.January</option>
                <option value="2">2.February</option>
                <option value="3">3.March</option>
                <option value="4">4.April</option>
                <option value="5">5.May</option>
                <option value="6">6.June</option>
                <option value="7">7.July</option>
                <option value="8">8.August</option>
                <option value="9">9.September</option>
                <option value="10">10.October</option>
                <option value="11">11.November</option>
                <option value="12">12.December</option>
              </select>
            </div>
            <br></br>
            <div class="form-check">
              <img src={imag} width={50} height={30} />
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                On Delivery
              </label>
            </div>
            <br></br>

            <div class="col">
              <button
                type="submit"
                class="btn btn-primary mb-3"
                onClick={handleCheckout}
              >
                Confirm Order
              </button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
