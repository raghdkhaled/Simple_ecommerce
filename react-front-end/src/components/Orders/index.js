import { useData } from "./../../contexts/commonData";
import Order from "./Order";
const Orders = () => {
  const { orders, user } = useData();
  const userOrders = orders.filter((order) => order.userId === user.id);

  console.log(userOrders);
  return (
    <div className="col-12 ">
      <div className=" fs-1 fw-bold text-dark text-center">
        {"You have " + userOrders.length + " orders"}
      </div>
      {userOrders.map((order, index) => (
        <Order order={order} number={userOrders.length - index} />
      ))}
    </div>
  );
};

export default Orders;
