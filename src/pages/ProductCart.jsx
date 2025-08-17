
import { useState } from "react";
import useProductContext from "../contexts/ProductContext";    


function ProductQuantity({product}) {

    const {productsData, setProductsData} = useProductContext();

    function handleIncrementProductQuantity() {

        const updatedProduct = productsData.map((curr) => {
            if (curr._id != product._id) {
                return curr;
            }
            return {
                ...curr,
                quantity: product.quantity + 1
            }
        })
        setProductsData(updatedProduct)
    }

    function handleDecrementProductQuantity() {

        const updatedProduct = productsData.map((curr) => {
            if (curr._id != product._id) {
                return curr;
            }
            return {
                ...curr,
                quantity: product.quantity - 1
            }
        })
        setProductsData(updatedProduct)
    }
    return (
        <div>
            <p><strong>Quantity: </strong>        
                <span>
                    <button onClick={() => handleDecrementProductQuantity()} className="px-2">-</button>
                </span>
                <span className="p-2">
                    {product.quantity}
                </span>
                <span>
                    <button onClick={() => handleIncrementProductQuantity()} className="px-2">+</button>
                </span>                          
            </p> 
        </div>
    );
}

export default function ProductCart() {
    const {productsData, handleAddRemoveProductInCart, noOfUniqueProductsInCart} = useProductContext();

    const totalPrice = productsData.reduce((total, curr) => {
        total += curr.isAddedToCart === true ? curr.price * curr.quantity: 0;
        return Number((total).toFixed(2));
    }, 0)

    const discountedPrice = (product) => {
        const value = (product.price * product.quantity) - (product.price * product.quantity * product.discountPercentage * 0.01);
        return Number((value).toFixed(2));
    }

    const totalDiscountedAmount = productsData.reduce((total, curr) => {
        total += curr.isAddedToCart ? (curr.price * curr.quantity * curr.discountPercentage * 0.01) : 0;
        return Number((total).toFixed(2));
    }, 0)

    const totalAmountAfterDiscount = totalPrice - totalDiscountedAmount;
    const totalAmountAfterDiscountPlusDeliveryCharges = totalAmountAfterDiscount + 499;
    const savedAmount = Number((totalPrice - totalAmountAfterDiscount).toFixed(2));    
    return (
        <main className="container py-4">
            <h1 className="text-center">MY CART ({noOfUniqueProductsInCart})</h1>
            <div className="row gap-2 justify-content-center py-4">
                <div className="col-md-5">
                    <div>
                        {productsData?.map((product) => product.isAddedToCart && (
                            <div key={product._id} className="card mb-5">

                                <div className="row">
                                    <div className="col-5">
                                        <img 
                                            src={`${product.imageUrl}?&w=400&h=600&fit=crop`}
                                            alt={product.imageAlt} 
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-7 p-4">
                                        <h6>{product.name}</h6>
                                        
                                        <p>
                                            <span className="fs-4 me-2 fw-bold">
                                                &#8377;{discountedPrice(product)}
                                            </span>
                                            <small className="text-decoration-line-through text-secondary">
                                                &#8377;{product.price}
                                            </small>
                                            <br />
                                            <small className="text-secondary fw-bold">
                                                {product.discountPercentage}% off
                                            </small> 
                                        </p>
                                        <ProductQuantity product={product} />
                                        
                                        <button 
                                            onClick={() => handleAddRemoveProductInCart(product._id, false)} 
                                            className="p-2 bg-secondary border text-light text-center text-decoration-none">
                                            Remove From Cart
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card p-4">
                        <h6 className="fw-bold">PRICE DETAILS</h6>
                        <hr />
                        <p className="d-flex justify-content-between">
                            <span>Price ( {noOfUniqueProductsInCart} {noOfUniqueProductsInCart > 1 ? "items" : "item"} )</span>
                            <span>+ &#8377;{totalPrice}</span>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Discount</span>
                            <span>- &#8377;{totalDiscountedAmount}</span>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Delivery Charges</span>
                            <span>+ &#8377;499</span>
                        </p>
                        
                        <hr />
                        <p className="d-flex justify-content-between">
                            <span className="fw-bold">TOTAL AMOUNT</span>
                            <span className="fw-bold">&#8377;{totalAmountAfterDiscountPlusDeliveryCharges}</span>
                        </p>
                        <hr />
                        <p>You will save &#8377;{savedAmount} on this order </p>
                        <button  
                            className="p-2 bg-primary border text-light text-center text-decoration-none">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}