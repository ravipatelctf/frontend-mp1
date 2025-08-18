import { Link } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import { useState } from "react";


function ProductCard({product}) {
    const {handleAddRemoveProductInCart, handleAddRemoveProductInWishlist} = useProductContext();
    return (
            <div key={product._id} className="col-md-4 my-3">       
                <div className="card">
                    <Link to={`/products/${product._id}`} className="text-decoration-none text-black">
                        <img 
                            src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
                            alt={product.imageAlt} 
                            className="img-fluid"
                        />
                        <div className="card-body text-center">
                            <p>{product.name.slice(0, 28)}</p>
                            <p className="fw-bold"> &#8377;{product.price}</p>
                        </div>
                    </Link>
                    <Link 
                        to={`${product.isAddedToWishlist ? "/wishlist" : "" }`}
                        onClick={() => handleAddRemoveProductInWishlist(product._id, true)} 
                        className="p-2 bg-secondary border text-light text-center text-decoration-none">
                        { product.isAddedToWishlist ? "Go To WishList" : "Add To WishList"}
                    </Link>                    
                    <Link 
                        to={`${product.isAddedToCart ? "/cart" : "" }`}
                        onClick={() => handleAddRemoveProductInCart(product._id, true)} 
                        className="p-2 bg-secondary border text-light text-center text-decoration-none">
                        {product.isAddedToCart ? "Go To Cart" : "Add To Cart"}
                    </Link>
                </div>           
            </div>
    );
}

export default function Products() {

    const {productsData} = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    function handleRatingFilter(ratingValue) {
        const rating = parseInt(ratingValue)
        const productsByRating = productsData.filter((product) => (product.rating >= rating && product.rating < Math.floor(rating + 1)));
        setFilteredProducts(productsByRating)
    }

    return (
        <main className="container py-4"> 
            
            <div className="row">
                <div className="col-md-3">
                    <p className="d-flex justify-content-between p-1">
                        <span className="fw-bold fs-6">
                            Filters
                        </span>
                        {/* <span className="fs-6">
                            Clear
                        </span> */}
                    </p>
                    <div>
                        <p className="fw-bold">Rating</p>
                        <label htmlFor="rating">
                        <input type="radio" name="rating" id="rating" className="me-2" value={4} onChange={(event) => handleRatingFilter(event.target.value)} />
                        4 Stars and above
                        </label>
                        <br />
                        <label htmlFor="rating">
                        <input type="radio" name="rating" id="rating" className="me-2" value={3} onChange={(event) => handleRatingFilter(event.target.value)}  />
                        3 Stars and above
                        </label>
                        <br />
                        <label htmlFor="rating">
                        <input type="radio" name="rating" id="rating" className="me-2" value={2} onChange={(event) => handleRatingFilter(event.target.value)}  />
                        2 Stars and above
                        </label>
                        <br />
                        <label htmlFor="rating">
                        <input type="radio" name="rating" id="rating" className="me-2" value={1} onChange={(event) => handleRatingFilter(event.target.value)}  />
                        1 Stars and above
                        </label>                        
                    </div>
                </div>
                <div className="col-md-9"> 
                    <div className="row">
                        <p>
                            <span className="fw-bold fs-5">Showing All Products</span>
                            <span className="ms-2">( showing {filteredProducts.length} products )</span>
                        </p>
                        {(filteredProducts).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}