
import { useEffect, useState } from "react";
import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

export function ProductSize({product}) {
    
    const {productsData, setProductsData} = useProductContext();
    const [currentSize, setCurrentSize] = useState("S");

    function handleSizeChange(size) {
                                  
        toast.info(`Size set ${size}`)
        // --------------------------------------------
        const updatedProduct = (preValues) => {
            return preValues.map((curr) => {
                if (curr._id != product._id) {
                    return curr;
                }
                return {
                    ...curr,
                    size: size
                }
            })
        }
        setProductsData((preValues) => updatedProduct(preValues))
        // --------------------------------------------
    }
    return (
        <div className="d-flex align-items-center gap-2 justify-content-start">
            <label className="fw-bold">Size:</label>
            <div className="mb-2">
                {
                    ["S", "M", "XL", "XXL"].map((size) => (
                        <button 
                            key={size} 
                            type="button" 
                            name={size}
                            className={`ms-1 btn btn-outline-primary btn-sm text-secondary fw-bold ${currentSize === size ? "active text-white" : "text-secondary"} `} 
                            onClick={() => {
                                setCurrentSize(size)
                                handleSizeChange(size)
                            }}>
                        {size}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}