import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({product}) {
    const {handleAddToCartProducts, handleRemoveFromWishlistProducts} = useProductContext();
    const [addToCartBtnStatus, setAddToCartBtnStatus] = useState(false);
    return (
            <div key={product._id} className="col-md-3 my-3">       
                <div className="card">
                        <img 
                            src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
                            alt={product.imageAlt} 
                            className="img-fluid rounded-top"
                        />
                        <div className="card-body text-center">
                            <h6>{product.name.slice(0, 28)}</h6>
                            <p className="fw-bold"> &#8377;{product.price}</p>
                        </div>
                    {
                        !addToCartBtnStatus ? (
                            <button 
                                onClick={() => {
                                    toast.success("Product added to cart successfully.")
                                    handleAddToCartProducts(product)
                                    setAddToCartBtnStatus(true)    
                                }} 
                                className="p-2 fw-bold btn btn-primary mb-1 mx-1">
                                Add To Cart
                            </button>
                        ) : (
                            <Link 
                                to="/cart"
                                className="p-2 fw-bold btn btn-primary mb-1 mx-1">
                                Go To Cart
                            </Link>  
                        )
                    }


                    <button 
                        onClick={() => {
                            toast.success("Product removed from wishlist successfully.")
                            handleRemoveFromWishlistProducts(product)     
                        }} 
                        className="p-2 fw-bold btn btn-danger mb-1 mx-1">
                        Remove from Wishlist
                    </button>                    
                </div>           
            </div>
    );
}

export default function Wishlist() {
    const {wishlistProducts, loading, error} = useProductContext();

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }

    return (
        <main className="container">
            <h1 className="text-center py-4">Wishlist page</h1>
            <div className="row">
                {wishlistProducts ? (wishlistProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                    )
                )) : (
                    <p className="text-center py-2">No products found in wishlist!</p>
                )
            }
            </div>
        </main>

    );
}