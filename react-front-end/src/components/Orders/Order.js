import OrderItem from "./OrderItem";

const Order = ({ order, number }) => {
  console.log(order);
  return (
    <div className="col-12 shadow-lg my-3 rounded p-3">
      <div className="fs-1 fw-bold text-primary ">{"Order#" + number}</div>

      {order?.products?.map((product, index) => (
        <OrderItem product={product} number={index + 1} />
      ))}
    </div>
  );
};

export default Order;
