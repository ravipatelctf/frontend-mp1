
import { useEffect, useState } from "react";
import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

export function ProductSize({product}) {
    
    const {productsData, setProductsData, currentSize, setCurrentSize, handleSizeChange} = useProductContext();
    
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
                            className={`ms-1 btn btn-outline-primary btn-sm text-secondary fw-bold ${currentSize[product._id] === size ? "active text-white" : "text-secondary"} `} 
                            onClick={() => {
                                handleSizeChange(product, size)
                            }}>
                        {size}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}