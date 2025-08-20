
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
                
                <div className="row">
                    {orderStatus && Array.isArray(orders) && orders?.map(order => (
                        <ProductCard key={order._id} product={order} />
                    ))}
                </div>
            </div>
        </>
    )
}