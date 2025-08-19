
import useProductContext from "../contexts/ProductContext";
import { useState } from "react";

export function ProductQuantity({product}) {

    const {productsData, setProductsData} = useProductContext();
    const [btnState, setBtnState] = useState(null);
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
        alert("Product in cart increased by 1.")
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
        alert("Product in cart decreased by 1.")
    }
    return (
        <div>
            <p><strong>Quantity: </strong>        
                <span>
                    <button 
                        onClick={() => {
                            setBtnState("-")
                            handleDecrementProductQuantity()
                        }} 
                        className={`fw-bold px-3 btn btn-outline-secondary ${btnState === "-" ? "active" : ""}`}>-</button>
                </span>
                <span className="px-2">
                    {product.quantity}
                </span>
                <span>
                    <button 
                        onClick={() => {
                            setBtnState("+")
                            handleIncrementProductQuantity()
                        }} 
                        className={`fw-bold px-3 btn btn-outline-secondary ${btnState === "+" ? "active" : ""}`}>+</button>
                </span>                          
            </p> 
        </div>
    );
}