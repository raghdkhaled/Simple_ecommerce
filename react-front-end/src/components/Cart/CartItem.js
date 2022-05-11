import { propTypes } from "react-bootstrap/esm/Image";
import { FaTimes } from "react-icons/fa";

const CartItem = ({
  title,
  img,
  Description,
  price,
  quantity,
  id,
  onDelete,
  Quantity,
}) => {
  return (
    <div className="card mb-4 col-12 px-1 py-2">
      <div className="row m-0 no-gutters">
        <div className="col d-flex py-2 justify-content-center">
          <img
            src={img}
            style={{
              width: "150px",
              objectFit: "scale-down",
            }}
          />
        </div>
        <div className="col-6" style={{ padding: "13px" }}>
          <div className="card-block px-2">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{Description}</p>
          </div>
        </div>
        <b className="col fs-4 fw-bold text-success">{price.toFixed(2)}EGP </b>
      </div>

      <div className=" col-md-7 offset-md-3">
        <div className="">
          <label className="text-secondary fs-3 fw-bold">Quantity : </label>
          <i
            className="fs-3 fa fa-minus-circle text-primary mx-2"
            onClick={() => {
              Quantity(quantity - 1, id);
            }}
          />
          <label className="text-secondary fs-3 fw-bold">{quantity}</label>
          <i
            className="fs-3 fa fa-plus-circle text-primary mx-2"
            onClick={() => {
              Quantity(quantity + 1, id);
            }}
          />
          <button
            style={{
              color: "white",
              backgroundColor: "red",
              cursor: "pointer",
            }}
            className="btn btn-danger align fs-5 fw-bold py-1 px-3"
            onClick={() => onDelete(id)}
          >
            Remove
            <i class="ms-2 fs-4 fw fa fa-trash-o" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
