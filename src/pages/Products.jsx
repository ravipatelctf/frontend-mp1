import { productsData } from "../data";
import { Link } from "react-router-dom";

console.log(productsData);

export default function Products() {
    return (
        <>
            <main className="container py-4">
                <h1>Showing All Products</h1>
                <div className="row">
                    {productsData?.map((productData) => (

                    <div key={productData._id} className="col-md-4 my-3">
                        <Link to={`/products/${productData._id}`} className="text-decoration-none">
                            <div className="card">
                                <img 
                                    src={productData.productImageUrl} 
                                    alt={productData.productImageAlt} 
                                    className="img-fluid" 
                                />
                                <div className="card-body text-center">
                                    <h5>{productData.productName}</h5>
                                    <p className="fw-bold"> &#8377;{productData.productPrice}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    ))}
                </div>
            </main>
        </>
    )
}