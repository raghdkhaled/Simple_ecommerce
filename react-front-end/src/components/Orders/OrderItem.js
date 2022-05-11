const OrderItem = ({ product, number }) => {
  return (
    <div className="row bg-white pb-3 m-2 my-4 rounded shadow">
      <div className="fs-1 fw-bold text-primary">{+number}</div>
      <div className="col-2">
        <img
          src={product.image}
          className="w-100"
          style={{
            height: "200px",
            objectFit: "scale-down",
          }}
        />
      </div>
      <div className="col ">
        <label className="text-secondary fs-2 fw-bold text-capitalize">
          {product.name}
        </label>
      </div>
      <div className="col text-center align-item">
        <label className="text-secondary fs-3 fw-bold me-2"> Price: </label>
        <label className="text-success fs-3 fw-bold">
          {product.price.toFixed(2)}
        </label>
      </div>
      <div className="col">
        <label className="text-secondary fs-3 fw-bold me-2">Quantity:</label>
        <label className="text-success fs-3 fw-bold">{product.quantity}</label>
      </div>
      <div className="col">
        <label className="text-secondary fs-3 fw-bold me-2">Item Total:</label>
        <label className="text-success fs-3 fw-bold">
          {(product.price * product.quantity).toFixed(2)}EGP
        </label>
      </div>
    </div>
  );
};

export default OrderItem;
