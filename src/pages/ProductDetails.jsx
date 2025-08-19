
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";

export default function ProductDetails() {
    const {productId} = useParams();
    const {loading, error, productsData, handleAddRemoveProductInWishlist, handleAddRemoveProductInCart } = useProductContext();

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }

    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    
    const targetProduct = productsData.find(product => product._id === productId);
    const discountedPrice =(targetProduct.price)- (targetProduct.price * targetProduct.discountPercentage * 0.01);

    return (
        <main className="bg-light">
            <div className="container py-4">
            <div className="row border p-2 bg-white">
                <div className="col-md-4">
                    <img 
                        src={`${targetProduct.imageUrl}?&w=400&h=400&fit=crop`} 
                        alt={targetProduct.imageAlt} 
                        className="img-fluid mb-2" 
                    />
                    <div className="mb-2 text-center"> 
                    <Link 
                        type="button"
                        to={`${isInWishlist ? "/wishlist" : "" }`}
                        onClick={() => {
                            setIsInWishlist(true)
                            handleAddRemoveProductInWishlist(targetProduct._id, true)
                        }} 
                        className="btn btn-secondary me-2 px-4">
                        { isInWishlist ? "Go To WishList" : "Add To WishList"}
                    </Link>      
                    <Link 
                        type="button"
                        to={`${isInCart ? "/cart" : "" }`}
                        onClick={() => {
                            setIsInCart(true)
                            setProductsInCart((preValues) => [...preValues, targetProduct._id])
                            handleAddRemoveProductInCart(targetProduct._id, true)
                        }} 
                        className="btn btn-primary px-4">
                        { isInCart ? "Go To Cart" : "Add To Cart" }
                    </Link>
                    </div>
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
                    <p><strong>Quantity: </strong>{targetProduct.quantity}</p>
                    <p><strong>Size: </strong>{targetProduct.size}</p>
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