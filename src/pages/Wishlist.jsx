import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

function ProductCard({product}) {
    const {handleAddRemoveProductInCart, handleAddRemoveProductInWishlist} = useProductContext();

    return (
            <div key={product._id} className="col-md-3 my-3">       
                <div className="card">
                        <img 
                            src={`${product.imageUrl}?&w=400&h=400&fit=crop`}
                            alt={product.imageAlt} 
                            className="img-fluid"
                        />
                        <div className="card-body text-center">
                            <h6>{product.name.slice(0, 28)}</h6>
                            <p className="fw-bold"> &#8377;{product.price}</p>
                        </div>
                    <button 
                        onClick={() => {
                            toast.success("Product removed from cart successfully.")
                            handleAddRemoveProductInCart(product._id, true);
                            handleAddRemoveProductInWishlist(product._id, false);
                        }} 
                        className="p-2 bg-primary border text-light text-center text-decoration-none">
                        Move To Cart
                    </button>
                    <button 
                        onClick={() => {
                            toast.success("Product removed from wishlist successfully.")
                            handleAddRemoveProductInCart(product._id, false);
                            handleAddRemoveProductInWishlist(product._id, false)
                        }} 
                        className="p-2 bg-secondary border text-light text-center text-decoration-none">
                        Remove from Wishlist
                    </button>                    
                </div>           
            </div>
    );
}

export default function Wishlist() {
    const {productsData, loading, error} = useProductContext();

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }

    const wishlistProducts = productsData.filter(product => product.isAddedToWishlist);

    return (
        <main className="container">
            <h1>Wishlist page</h1>
            <div className="row">
                {wishlistProducts.length > 0 ? (wishlistProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                    )
                )) : (
                    <p className="text-center py-4">There are NO products in wishlist.</p>
                )
            }
            </div>
        </main>

    );
}