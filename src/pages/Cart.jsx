
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";    
import { ProductQuantity } from "../components/ProductQuantity";
import { ProductSize } from "../components/ProductSize";
import { createNewOrder, getUser} from "../data";
import { toast } from "react-toastify";
import { roundOffNum } from "../components/atomicFunctions";

// ------------------------------------------------------------------------------------------------------------------------------------------------
export default function Cart() {
    const {setSelectedAddress, setPlaceOrderAddresses, selectedAddress, setOrderSummaryStatus, cartProducts, handleRemoveFromCartProducts, handleAddToWishlistProducts, productsData, loading, error, noOfUniqueProductsInCart, quanityOfProductsInCart, searchedProducts} = useProductContext();
    const [addToWishlistBtnStatus, setAddToWishlistBtnStatus] = useState(false);
    // -----------------------------------------------------------------------------------
    // fetch the user once when the component mounts
    useEffect(() => {

        async function loadData() {
            try {
                const data = await getUser();
                setPlaceOrderAddresses(data.addresses); 
            } catch (error) {
                throw error;
            }
        }
        loadData();
    }, []);

    if(cartProducts && cartProducts.length <= 0) {
        return (
            <div className="mt-4">
                <h1 className="text-center">MY CART ({noOfUniqueProductsInCart})</h1>
                <p className="text-center py-4">No products found in cart!</p>
            </div>
        )  
    }

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }

    const totalPrice = productsData.reduce((total, curr) => {
        total += curr && curr.isAddedToCart === true ? curr.price * curr.quantity: 0;
        return roundOffNum(total);
    }, 0)

    const discount = (product) => {
        const value = (product.price) - (product.price * product.discountPercentage * 0.01);
        return roundOffNum(value);
    }

    const totalDiscountedAmount = productsData.reduce((total, curr) => {
        total += curr && curr.isAddedToCart ? (curr.price * curr.quantity * curr.discountPercentage * 0.01) : 0;
        return roundOffNum(total);
    }, 0)

    const totalAmountAfterDiscount = roundOffNum(totalPrice - totalDiscountedAmount);
    const totalAmountAfterDiscountPlusDeliveryCharges = roundOffNum(totalAmountAfterDiscount + 499);
    const savedAmount = roundOffNum(totalPrice - totalAmountAfterDiscount);  

    // -------------------------------------------------------------------------------------
    // place order logic
    async function handlePlaceOrder() {
        try {
            if (!selectedAddress) {
                toast.warn("Select an address to place order.")
                return;
            } else {
                toast.info("Placing order...Please wait...")
            }
            
            const productsArray = cartProducts.map(item => {
                return {
                    "product": item._id,
                    "quantity": item.quantity,
                    "size": item.size,
                }
            })
            const newOrderObject = {
                "products": productsArray,
                "totalPrice": totalPrice,
                "discount": totalDiscountedAmount,
                "deliveryCharge": 499,
                "address": selectedAddress,                
            };
            const createdOrder = await createNewOrder(newOrderObject);
            if (createdOrder) {
                setOrderSummaryStatus(false)
                toast.success("Order placed successfully.");
            } else {
                toast.error("Failed to place order!")
            }
            
            
            setSelectedAddress("")
            // ---------------------------------------------------------
            cartProducts.forEach((curr) => {
                handleRemoveFromCartProducts(curr);
            });
            // ---------------------------------------------------------
        } catch (error) {
            toast.error("Failed to place order!")
        }
    }   
    // -------------------------------------------------------------------------------------
    const orderSummaryObj = {
        quanityOfProductsInCart,
        totalPrice,
        totalDiscountedAmount,
        totalAmountAfterDiscountPlusDeliveryCharges,
        selectedAddress
    };


    // -------------------------------------------------------------------------------------
    return (
        <main className="container py-4">
            <OrderSummary orderSummaryObj={orderSummaryObj} handlePlaceOrder={handlePlaceOrder} />
            <h1 className="text-center">MY CART ({noOfUniqueProductsInCart})</h1>
            <div className="row justify-content-between py-4">
                <div className="col-lg-6 p-2">
                    <div>
                        {(searchedProducts.length > 0 ? searchedProducts : cartProducts).map((product) => (
                            <div key={product._id} className="card mb-5">

                                <div className="row">
                                    <div className="col-md-5">
                                        <img 
                                            src={`${product.imageUrl}?&w=400&h=650&fit=crop`}
                                            alt={product.imageAlt} 
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-md-7 px-4 pt-4 pb-2">
                                        <h6>{product.name.slice(0, 28)}</h6>
                                        
                                        <p>
                                            <span className="fs-4 me-2 fw-bold">
                                                &#8377;{discount(product)}
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
                                        
                                        <ProductSize product={product} />
                                        
                                        <button 
                                            onClick={() => {
                                                toast.success("Product removed from cart successfully.")
                                                handleRemoveFromCartProducts(product)
                                                
                                            }} 
                                            className="w-100 p-2 fw-bold btn btn-danger mb-1">
                                            Remove From Cart
                                        </button>
                                        {
                                            !addToWishlistBtnStatus ? (
                                                <button 
                                                    onClick={() => {
                                                        toast.success("Product added to wishlist successfully.")
                                                        handleAddToWishlistProducts(product)
                                                        setAddToWishlistBtnStatus(true)
                                                    }}
                                                    className="w-100 p-2 fw-bold btn btn-secondary mb-1">
                                                    Add To Wishlist
                                                </button>
                                            ) : (
                                                <Link 
                                                    to="/wishlist"
                                                    className="w-100 p-2 fw-bold btn btn-secondary mb-1">
                                                    Go To Wishlist
                                                </Link>  
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card p-4 mt-2">
                        <h6 className="fw-bold">PRICE DETAILS</h6>
                        <hr />
                        <p className="d-flex justify-content-between">
                            <span>Price ( {quanityOfProductsInCart} {quanityOfProductsInCart > 1 ? "items" : "item"} )</span>
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

                        <div>
                            <button
                                type="button"
                                className={`btn ${quanityOfProductsInCart <= 0 ? "btn-secondary fw-bold mt-2 w-100 py-2" : "btn-success fw-bold mt-2 w-100 py-2"}`}
                                disabled={quanityOfProductsInCart <= 0}
                                onClick={() => {
                                    setOrderSummaryStatus(true); 
                                }}  
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function OrderSummary({orderSummaryObj, handlePlaceOrder}) {
        const {quanityOfProductsInCart, orderSummaryStatus, setOrderSummaryStatus, selectedAddress, setSelectedAddress, placeOrderAddresses, setPlaceOrderAddresses} = useProductContext();
    return orderSummaryStatus && (
        <div className="modal show fade d-block bg-dark bg-opacity-75" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header ">     
                        <h5 className="modal-title fs-5">Order Summary</h5>
                        <button
                            type="button"
                            className="btn-close p-2 "
                            onClick={() => setOrderSummaryStatus(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Number of Products Ordered: </strong>{orderSummaryObj.quanityOfProductsInCart}</p>
                        <p><strong>Total Price: </strong>&#8377;{roundOffNum(orderSummaryObj.totalPrice)}</p>
                        <p><strong>Discount : </strong>&#8377;{roundOffNum(orderSummaryObj.totalDiscountedAmount)}</p>
                        <p><strong>Delivery Charge: </strong>&#8377;499</p>
                        <p><strong>Total Amount Paid: </strong>&#8377;{roundOffNum(orderSummaryObj.totalAmountAfterDiscountPlusDeliveryCharges)}</p>
                        <p><strong>Address: </strong>{orderSummaryObj.selectedAddress ? orderSummaryObj.selectedAddress : "No address selected!"}</p>
                    </div>
                    <div className="modal-footer">
                        <select 
                            onChange={(event) => setSelectedAddress(event.target.value)} 
                            name="address" 
                            id="address" 
                            className="form-select fw-bold mb-1"
                            defaultValue={selectedAddress}
                        >
                            <option value="" disabled>Select Address</option>
                            {
                                placeOrderAddresses?.map(e => (
                                    <option key={e._id} value={e.address}>{e.address}</option>
                                ))
                            }
                        </select>

                        <button
                            type="button"
                            className={`btn ${quanityOfProductsInCart <= 0 ? "btn-secondary fw-bold mt-2 w-100 py-2" : "btn-success fw-bold mt-2 w-100 py-2"}`}
                            disabled={quanityOfProductsInCart <= 0}
                            onClick={() => {
                                // selectedAddress && setOrderSummaryStatus(false)
                                handlePlaceOrder()
                            }}  
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
}
