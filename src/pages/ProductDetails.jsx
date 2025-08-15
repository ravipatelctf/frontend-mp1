
import { useParams } from "react-router-dom";
import { productsData } from "../data";

export default function ProductDetails() {
    const {productId} = useParams();
    
    const targetProduct = productsData.find(product => product._id === productId);

    console.log(targetProduct)
    console.log(targetProduct.productName)
    const discountedPrice =(targetProduct.productPrice)- (targetProduct.productPrice * targetProduct.discountPercentage * 0.01);

    return (
        <main className="bg-light">
            <div className="container py-4">
            <div className="d-flex gap-5 border p-2 bg-white">
                <div>
                    <img 
                        src={targetProduct.productImageUrl} 
                        alt={targetProduct.productImageAlt} 
                        className="img-fluid" />
                </div>
                <div>
                    <h3>{targetProduct.productName}</h3>
                    <p>Rating: {targetProduct.productRating}</p>
                    <p>
                        <span className="fs-4 me-2 fw-bold">
                            &#8377; {discountedPrice}
                        </span>
                        <small className="text-decoration-line-through text-secondary">
                            &#8377; {targetProduct.productPrice}
                        </small>
                        <br />
                        <small className="text-secondary fw-bold">
                            {targetProduct.discountPercentage}% off
                        </small> 
                    </p>
                    <p><strong>Quantity: </strong>{targetProduct.productQuantity}</p>
                    <p><strong>Size: </strong>{targetProduct.productSize}</p>
                    <p className="fw-bold">Description</p>
                    <ul>
                        <li>{targetProduct.productDescription}</li>
                    </ul>
                </div>   
            </div>
            </div>
        </main> 
    );
}