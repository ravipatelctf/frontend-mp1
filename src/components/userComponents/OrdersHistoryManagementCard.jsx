
import { useState } from "react";
import {toast} from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import { roundOffNum } from "../atomicFunctions";

export function OrdersHistoryManagementCard() {
    const {orders, orderedProducts} = useUserContext();
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
                
                <div className="row py-4 mx-1 mb-2">
                    {orderStatus &&  orders?.map(order => (
                       
                        <div key={order._id} className="card p-4 mb-4">

                            <div className="row">
                                <div className="col-md-4 my-2">
                                    <p><strong>Number of Products Ordered: </strong>{order.products.length}</p>
                                    <p><strong>Total Price: </strong>&#8377;{roundOffNum(order.totalPrice)}</p>
                                    <p><strong>Discount : </strong>&#8377;{roundOffNum(order.discount)}</p>
                                    <p><strong>Delivery Charge: </strong>&#8377;{roundOffNum(order.deliveryCharge)}</p>
                                    <p><strong>Total Amount Paid: </strong>&#8377;{roundOffNum(order.totalPrice - order.discount + order.deliveryCharge)}</p>
                                    <p><strong>Address: </strong>{order.address}</p>
                                </div>                     
                                {
                                    order.products.map((item) => (
                                        <ProductCard key={item.product._id} product={item.product} item={item} />
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// ----------------------------------------------------------------------
// product card components

export function ProductCard({product, item}) {   
    return (
        <div className="col-md-4 my-2">       
            <div className="card">
                <CardContent product={product} item={item} />
            </div>           
        </div>
    );
}

function CardContent({product, item}) {
    return (
        <div className="text-decoration-none text-black">
            <CardImage product={product} />
            <CardBody product={product} item={item} />
        </div>
    );
}

function CardImage({product}) {
    return (
        <img 
            src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
            alt={product.imageAlt} 
            className="img-fluid rounded-top"
        />
    );
}

function CardBody({product, item}) {
    return (
        <div className="card-body text-center">
            <p>
                <span className="fw-bold">{product.name.slice(0, 28)}</span>
            </p>
            <p className="fw-bold"> &#8377;{product.price}</p>
            <p>
                <span>Size: <strong>{item.size}</strong> | </span>
                <span>Quantity: <strong>{item.quantity}</strong></span>
            </p>
        </div>
    );
}
