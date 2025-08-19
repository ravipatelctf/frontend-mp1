
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import {ProductQuantity} from "../components/ProductQuantity";
import {ProductSize} from "../components/ProductSize";

function ButtonWishlist({product}) {
    const {handleAddRemoveProductInWishlist} = useProductContext();
    const [isInWishlist, setIsInWishlist] = useState(false);
    return !isInWishlist ? (
        <button
            onClick={() => {
                setIsInWishlist(true)
                handleAddRemoveProductInWishlist(product._id, true)
            }} 
            className="w-100 p-2 btn btn-secondary mb-1">
            Add To WishList
        </button>
        ) : (
        <Link 
            to="/wishlist"
            className="w-100 p-2 btn btn-secondary mb-1">
            Go To WishList
        </Link>       
    )
}

function ButtonCart({product}) {
    const {handleAddRemoveProductInCart} = useProductContext();
    const [isInCart, setIsInCart] = useState(false);
    return !isInCart ? (
        <button 
            onClick={() => {
                setIsInCart(true)
                
                handleAddRemoveProductInCart(product._id, true)
            }} 
            className="w-100 p-2 btn btn-primary">
            Add To Cart
        </button>
        ) : (
            <Link 
                to="/cart"
                className="w-100 p-2 btn btn-primary">
                Go To Cart
            </Link>
        );
}


export default function ProductDetails() {
    const {productId} = useParams();
    const {loading, error, productsData, handleAddRemoveProductInWishlist, handleAddRemoveProductInCart } = useProductContext();

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }
    
    const targetProduct = productsData.find(product => product._id === productId);
    const discountedPrice =(targetProduct.price)- (targetProduct.price * targetProduct.discountPercentage * 0.01);

    return (
        <main className="bg-light">
            <div className="container py-4">
            <div className="row border p-2 bg-white">
                <div className="col-md-4 mb-4">
                    <img 
                        src={`${targetProduct.imageUrl}?&w=400&h=400&fit=crop`} 
                        alt={targetProduct.imageAlt} 
                        className="img-fluid mb-1" 
                    />
                    
                    <ButtonWishlist product={targetProduct} />
                    <ButtonCart product={targetProduct} /> 
                    
                </div>
                <div className="col-md-8">
                    <h3>{targetProduct.name}</h3>
                    <p>Category: {targetProduct.category}</p>
                    <p>Rating: {targetProduct.rating}</p>
                    <p>
                        <span className="fs-4 me-2 fw-bold">
                            &#8377; {discountedPrice}
                        </span>
                        <small className="text-decoration-line-through text-secondary">
                            &#8377; {targetProduct.price}
                        </small>
                        <br />
                        <small className="text-secondary fw-bold">
                            {targetProduct.discountPercentage}% off
                        </small> 
                    </p>
                    
                    <ProductQuantity product={targetProduct} />
                    <ProductSize />
                    <p className="fw-bold">Description</p>
                    <ul>
                        <li>{targetProduct.description}</li>
                    </ul>
                </div>   
            </div>
            </div>
        </main> 
    );
}