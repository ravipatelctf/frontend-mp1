
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useProductContext from "../contexts/ProductContext";

export default function ProductCard({product}) {   
    return (
        <div className="col-md-4 my-3">       
            <div className="card">
                <CardContent product={product} />
                <ButtonWishlist product={product} />                   
                <ButtonCart product={product} />
            </div>           
        </div>
    );
}

export function CardContent({product}) {
    return (
        <Link to={`/products/${product._id}`} className="text-decoration-none text-black">
            <CardImage product={product} />
            <CardBody product={product} />
        </Link>
    );
}

export function CardImage({product}) {
    return (
        <img 
            src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
            alt={product.imageAlt} 
            className="img-fluid"
        />
    );
}

export function CardBody({product}) {
    return (
        <div className="card-body text-center">
            <p>
                <span>{product.name.slice(0, 28)}</span>
                <br />
                <small>Rating: <strong>{product.rating}</strong></small>
            </p>
            <p className="fw-bold"> &#8377;{product.price}</p>
        </div>
    );
}

export function ButtonWishlist({product}) {

    const {handleAddToWishlistProducts} = useProductContext();
    const [isInWishlist, setIsInWishlist] = useState(false);
    return !isInWishlist ? (
        <button
            onClick={() => {
                toast.success("Product added to wishlist successfully.")
                handleAddToWishlistProducts(product)
                setIsInWishlist(true)   
            }}
            className="p-2 btn btn-secondary mb-1 mx-1">
            Add To WishList
        </button>
        ) : (
        <Link 
            to="/wishlist"
            className="p-2 btn btn-secondary mb-1 mx-1">
            Go To WishList
        </Link>       
    )
}

export function ButtonCart({product}) {

    const {handleAddToCartProducts} = useProductContext();
    const [isInCart, setIsInCart] = useState(false);

    return !isInCart ? (
        <button 
            onClick={() => {
                toast.success("Product added to cart successfully.")
                setIsInCart(true)
                handleAddToCartProducts(product)
            }} 
            className="p-2 btn btn-primary mb-1 mx-1">
            Add To Cart
        </button>
        ) : (
            <Link 
                to="/cart"
                className="p-2 btn btn-primary mb-1 mx-1">
                Go To Cart
            </Link>
        );
}