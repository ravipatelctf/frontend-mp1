import useProductContext from "../contexts/ProductContext";

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
                            <h6>{product.name}</h6>
                            <p className="fw-bold"> &#8377;{product.price}</p>
                        </div>
                    <button 
                        onClick={() => {
                            handleAddRemoveProductInCart(product._id, true);
                            handleAddRemoveProductInWishlist(product._id, false);
                        }} 
                        className="p-2 bg-primary border text-light text-center text-decoration-none">
                        Move To Cart
                    </button>
                    <button 
                        onClick={() => handleAddRemoveProductInWishlist(product._id, false)} 
                        className="p-2 bg-secondary border text-light text-center text-decoration-none">
                        Remove from Wishlist
                    </button>                    
                </div>           
            </div>
    );
}

export default function Wishlist() {
    const {productsData} = useProductContext();
    return (
        <main className="container">
            <h1>Wishlist page</h1>
            <div className="row">
                {productsData?.map((product) => product.isAddedToWishlist && (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </main>

    );
}