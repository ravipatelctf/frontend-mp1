
import useProductContext from "../contexts/ProductContext";
import { useState } from "react";
import { toast } from "react-toastify";

export function ProductQuantity({product}) {

    const {productsData, setProductsData, productQuantity, setProductQuantity} = useProductContext();
    const [btnState, setBtnState] = useState(null);
    function handleIncrementProductQuantity() {

        // --------------------------------------------
        const productId = product._id;
        setProductQuantity((preValues) => (
            {
                ...preValues,
                [productId]: product.quantity + 1,
            }
        ))
        // --------------------------------------------

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
        
        // --------------------------------------------
        const productId = product._id;
        setProductQuantity((preValues) => (
            {
                ...preValues,
                [productId]: product.quantity - 1,
            }
        ))
        // --------------------------------------------

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
            <p><strong  className="me-2">Quantity:</strong>        
                <span>
                    <button 
                        onClick={() => {
                            toast.info("Product quantity decreased by 1")
                            setBtnState("-")
                            handleDecrementProductQuantity()
                        }} 
                        className={`fw-bold btn btn-outline-secondary btn-sm  ${btnState === "-" ? "active" : ""}`}>-</button>
                </span>
                <span className="px-2">
                    {product.quantity}
                </span>
                <span>
                    <button 
                        onClick={() => {
                            toast.info("Product quantity increased by 1")
                            setBtnState("+")
                            handleIncrementProductQuantity()
                        }} 
                        className={`fw-bold btn btn-outline-secondary  btn-sm ${btnState === "+" ? "active" : ""}`}>+</button>
                </span>                          
            </p> 
        </div>
    );
}