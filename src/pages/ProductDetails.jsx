
import { useParams } from "react-router-dom";
import { getData } from "../data";

const productsData = await getData();

export default function ProductDetails() {
    const {productId} = useParams();
    
    const targetProduct = productsData.find(product => product._id === productId);

    // console.log(targetProduct)
    // console.log(targetProduct.productName)
    const discountedPrice =(targetProduct.price)- (targetProduct.price * targetProduct.discountPercentage * 0.01);

    return (
        <main className="bg-light">
            <div className="container py-4">
            <div className="d-flex gap-5 border p-2 bg-white">
                <div>
                    <img 
                        src={`${targetProduct.imageUrl}?&w=400&h=400&fit=crop`} 
                        alt={targetProduct.imageAlt} 
                        className="img-fluid" 
                    />
                </div>
                <div>
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