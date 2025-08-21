
import { useEffect } from "react";
import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

export function ProductSize({product}) {
    
    const {productsData, setProductsData, productSize, setProductSize} = useProductContext();
    const productId = product._id;

    // ------------------------------------------------------------
    // set a default size for each product when component mounts
    useEffect(() => {

        setProductSize((preValues) => {
            return {
                ...preValues,
                [productId]: "S"
            }
        });

    }, [])
    // -----------------------------------------------------------

    function handleSizeChange(size) {
                                  
        // --------------------------------------------
        setProductSize((preValues) => (
            {
                ...preValues,
                [productId]: size 
            }
        ))
        // --------------------------------------------
        toast.info(`Size set ${size}`)
        // --------------------------------------------
        const updatedProduct = productsData.map((curr) => {
            if (curr._id !== product._id) {
                return curr;
            }
            return {
                ...curr,
                size: size
            }
        })
        setProductsData(updatedProduct)
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
                            className={`ms-1 btn btn-outline-primary btn-sm text-secondary fw-bold ${productSize && productSize[productId] === size ? "active text-white" : "text-secondary"} `} 
                            onClick={() => handleSizeChange(size)}>
                        {size}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}