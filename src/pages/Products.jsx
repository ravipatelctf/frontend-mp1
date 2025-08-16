
import { useState } from "react";
import { Link } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";


export default function Products() {

    const {productsData, handleAddRemoveProductInCart} = useProductContext();
     
    return (
        <>
            <main className="container py-4">
                
                <h1>Showing All Products</h1>
                <div className="row">
                    {productsData?.map((product) => (

                    <div key={product._id} className="col-md-3 my-3">
                        
                            <div className="card">
                                <Link to={`/products/${product._id}`} className="text-decoration-none text-black">
                                <img 
                                    src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
                                    alt={product.imageAlt} 
                                    className="img-fluid"
                                />
                                <div className="card-body text-center">
                                    <h6>{product.name}</h6>
                                    <p className="fw-bold"> &#8377;{product.price}</p>
                                </div>
                                </Link>
                                <Link 
                                    to={`${product.isAddedToCart ? "/cart" : "" }`}
                                    onClick={() => handleAddRemoveProductInCart(product._id, true)} 
                                    className="p-2 bg-secondary border text-light text-center text-decoration-none">
                                   {product.isAddedToCart ? "Go To Cart" : "Add To Cart"}
                                </Link>
                            </div>
                        
                    </div>

                    ))}
                </div>
            </main>
        </>
    )
}