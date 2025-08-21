
import { useState } from "react";
import {toast} from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import { ProductCard } from "./ProductCard";


export function OrdersHistoryManagementCard() {
    const {orders} = useUserContext();
    const [orderStatus, setOrderStatus] = useState(false);
    return (
        <>
            <div className="mt-2">
                <button className="btn btn-info" onClick={() => {
                    !orderStatus && toast.info("Orders are visible now.")
                    orderStatus && toast.info("Orders are hidden now.")
                    setOrderStatus(!orderStatus)
                }}>
                    {orderStatus ? "Hide Order History" : "See Order History"}
                </button>
                
                <ul className="list-group py-4">
                    {orderStatus && Array.isArray(orders) && orders?.map(order => (
                        // <ProductCard key={order._id} product={order} />
                        <li className="list-group-item">
                            <p><strong>Number of Products Ordered: </strong>{order.products.length}</p>
                            <p><strong>Total Price: </strong>&#8377;{order.totalPrice}</p>
                            <p><strong>Discount : </strong>&#8377;{order.discount}</p>
                            <p><strong>Delivery Charge: </strong>&#8377;{order.deliveryCharge}</p>
                            <p><strong>Total Amount Paid: </strong>&#8377;{order.totalPrice - order.discount}</p>
                            <p><strong>Address: </strong>{order.address}</p>
                            <div className="row">
                                {
                                    order.products.map((item) => (
                                        <ProductCard key={item.product._id} product={item.product} />
                                    ))
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}