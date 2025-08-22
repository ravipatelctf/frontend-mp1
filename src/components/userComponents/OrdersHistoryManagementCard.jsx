
import { useState } from "react";
import {toast} from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import { ProductCard } from "./ProductCard";
import { roundOffNum } from "../atomicFunctions";

export function OrdersHistoryManagementCard() {
    const {orders} = useUserContext();
    const [orderStatus, setOrderStatus] = useState(false);

    function handleOrderStatus() {
        if (orders.length <= 0) {
            toast.warn("Order history is empty!");
            return;
        }
        !orderStatus && toast.info("Orders are visible now.")
        setOrderStatus(!orderStatus)
        orderStatus && toast.info("Orders are hidden now.")
    }
    
    return (
        <>
            <div className="mt-2">
                <button className="btn btn-info" onClick={() => {
                    handleOrderStatus()
                }}>
                    {orderStatus ? "Hide Order History" : "See Order History"}
                </button>
                
                <ul className="list-group py-4">
                    {orderStatus &&  orders?.map(order => (
                       
                        <li key={order._id} className="list-group-item">
                            <p><strong>Number of Products Ordered: </strong>{order.products.length}</p>
                            <p><strong>Total Price: </strong>&#8377;{roundOffNum(order.totalPrice)}</p>
                            <p><strong>Discount : </strong>&#8377;{roundOffNum(order.discount)}</p>
                            <p><strong>Delivery Charge: </strong>&#8377;{roundOffNum(order.deliveryCharge)}</p>
                            <p><strong>Total Amount Paid: </strong>&#8377;{roundOffNum(order.totalPrice - order.discount + order.deliveryCharge)}</p>
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