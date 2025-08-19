import useProductContext from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useState } from "react";


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

function CardContent({product}) {
    return (
        <Link to={`/products/${product._id}`} className="text-decoration-none text-black">
            <CardImage product={product} />
            <CardBody product={product} />
        </Link>
    );
}

function CardImage({product}) {
    return (
        <img 
            src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
            alt={product.imageAlt} 
            className="img-fluid"
        />
    );
}

function CardBody({product}) {
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

function ButtonWishlist({product}) {
    const {handleAddRemoveProductInWishlist} = useProductContext();
    const [isInWishlist, setIsInWishlist] = useState(false);
    return !isInWishlist ? (
        <button
            onClick={() => {
                setIsInWishlist(true)
                handleAddRemoveProductInWishlist(product._id, true)
            }} 
            className="p-2 bg-secondary border text-light text-center text-decoration-none">
            Add To WishList
        </button>
        ) : (
        <Link 
            to="/wishlist"
            className="p-2 bg-secondary border text-light text-center text-decoration-none">
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
            className="p-2 bg-primary border text-light text-center text-decoration-none">
            Add To Cart
        </button>
        ) : (
            <Link 
                to="/cart"
                className="p-2 bg-primary border text-light text-center text-decoration-none">
                Go To Cart
            </Link>
        );
}