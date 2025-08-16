
import useProductContext from "../contexts/ProductContext";    

export default function ProductCart() {

    const {productsData, handleAddRemoveProductInCart} = useProductContext();

    const discountedPrice = (product) => {
        const value = (product.price) - (product.price * product.discountPercentage * 0.01);
        return parseInt((value).toFixed(2));
    }

    const totalPrice = productsData.reduce((total, curr) => {
        total += curr.isAddedToCart === true ? curr.price : 0;
        return parseInt((total).toFixed(2));
    }, 0)

    const totalDiscountedAmount = productsData.reduce((total, curr) => {
        total += curr.isAddedToCart ? (curr.price * curr.discountPercentage * 0.01) : 0;
        return parseInt((total).toFixed(2));
    }, 0)

    const totalAmountAfterDiscount = totalPrice - totalDiscountedAmount;
    const savedAmount = totalPrice - totalAmountAfterDiscount;    
    return (
        <main className="container py-4">
            <h1 className="text-center">MY CART (1)</h1>
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
                                        <p><strong>Quantity: </strong>{product.quantity}</p>    
                                        <p><strong>Size: </strong>{product.size}</p>
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
                            <span>Price (1 item)</span>
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
                            <span className="fw-bold">&#8377;{totalAmountAfterDiscount}</span>
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