
import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

export function ProductSize({product}) {
    
    const {productSize, setProductSize} = useProductContext();
    const productId = product._id;
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