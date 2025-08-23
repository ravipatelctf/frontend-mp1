
import useProductContext from "../contexts/ProductContext";

export function ProductSize({product}) {
    
    const {handleSizeChange} = useProductContext();
    
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
                            className={`ms-1 btn btn-outline-primary btn-sm text-secondary fw-bold ${ product.size === size ? "active text-white" : "text-secondary"} `} 
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