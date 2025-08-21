
import { useState, useEffect } from "react";
import useProductContext from "../contexts/ProductContext";    
import { ProductQuantity } from "../components/ProductQuantity";
import { ProductSize } from "../components/ProductSize";
import {updateData} from "../data";
import { toast } from "react-toastify";
import { useUserContext } from "../contexts/UserContext";

// ------------------------------------------------------------------------------------------------------------------------------------------------
export default function Cart() {
    const {productsData, loading, error, sizeValue, handleAddRemoveProductInCart, handleAddRemoveProductInWishlist, noOfUniqueProductsInCart, quanityOfProductsInCart, searchedProducts} = useProductContext();
    const [selectedAddress, setSelectedAddress] = useState("");
    const [placeOrderAddresses, setPlaceOrderAddresses] = useState([]);
    // -----------------------------------------------------------------------------------
        // fetch the user once when the component mounts
        useEffect(() => {
    
            async function fetchUser() {
                try {
                    const response = await fetch(`https://backend-mp1.vercel.app/api/user`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch users: ${response.status}`);
                    }
                    const data = await response.json();
                    
                    setPlaceOrderAddresses(data.addresses);
                    
                } catch (error) {
                    throw error;
                }
            }
    
            fetchUser();
        }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }

    const totalPrice = productsData.reduce((total, curr) => {
        total += curr.isAddedToCart === true ? curr.price * curr.quantity: 0;
        return Number((total).toFixed(2));
    }, 0)

    const discountedPrice = (product) => {
        const value = (product.price) - (product.price * product.discountPercentage * 0.01);
        return Number((value).toFixed(2));
    }

    const totalDiscountedAmount = productsData.reduce((total, curr) => {
        total += curr.isAddedToCart ? (curr.price * curr.quantity * curr.discountPercentage * 0.01) : 0;
        return Number((total).toFixed(2));
    }, 0)

    const totalAmountAfterDiscount = Number((totalPrice - totalDiscountedAmount).toFixed(2));
    const totalAmountAfterDiscountPlusDeliveryCharges = Number((totalAmountAfterDiscount + 499).toFixed(2));
    const savedAmount = Number((totalPrice - totalAmountAfterDiscount).toFixed(2));  
    
    // -------------------------------------------------------------------------------------
    // place order logic
    function handlePlaceOrder(event) {
        event.preventDefault();
        productsData.map(async (product) => {
            if(product.isAddedToCart) {
                await addToOrder({"productId": product._id});
                await updateData(product._id, {"size": sizeValue});
            }
        })
        if (selectedAddress) {
            toast.success("Order placed successfully.")
        } else {
            toast.warn("Select an address to place order.")
        }
        setSelectedAddress("")
    }

// ------------------------------------------------------------------------------------------
    // API call for updating user address
    async function addToOrder(dataToUpdate) {
        try {
            const response = await fetch(`https://backend-mp1.vercel.app/api/user/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToUpdate)
            });

            if (!response.ok) {
                throw new Error("Failed to update user address.");
            }
            const updatedUserData = await response.json();
            return updatedUserData;
        } catch (error) {
            throw error;
        }
    }
   
    // -------------------------------------------------------------------------------------
    return (
        <main className="container py-4">
            <h1 className="text-center">MY CART ({noOfUniqueProductsInCart})</h1>
            <div className="row justify-content-between py-4">
                <div className="col-lg-6 p-2">
                    <div>
                        {(searchedProducts.length > 0 ? searchedProducts : productsData).map((product) => (product.isAddedToCart && !product.isAddedToWishlist) && (
                            <div key={product._id} className="card mb-5">

                                <div className="row">
                                    <div className="col-md-5">
                                        <img 
                                            src={`${product.imageUrl}?&w=400&h=600&fit=crop`}
                                            alt={product.imageAlt} 
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-md-7 px-4 pt-4 pb-2">
                                        <h6>{product.name.slice(0, 28)}</h6>
                                        
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
                                        
                                        <ProductSize />
                                        
                                        <button 
                                            onClick={() => {
                                                toast.success("Product removed from cart successfully.")
                                                handleAddRemoveProductInCart(product._id, false)
                                            }} 
                                            className="w-100 btn btn-danger btn-sm mb-1 fw-bold">
                                            Remove From Cart
                                        </button>
                                        <button 
                                            onClick={() => {
                                                toast.success("Product moved to wishlist successfully.")
                                                handleAddRemoveProductInWishlist(product._id, true)
                                            }}
                                            className="w-100 btn btn-secondary btn-sm fw-bold">
                                            Move To Wishlist
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card p-4">
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

                        <form onSubmit={(event) => handlePlaceOrder(event)}>
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
                                type="submit"
                                className={`btn ${quanityOfProductsInCart <= 0 ? "btn-secondary" : "btn-success fw-bold"}`}
                                disabled={quanityOfProductsInCart <= 0}    
                            >
                                PLACE ORDER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
