
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------
// product card components

export function ProductCard({product}) {   
    return (
        <div className="col-md-3 my-3">       
            <div className="card">
                <CardContent product={product} />
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
            </p>
            <p className="fw-bold"> &#8377;{product.price}</p>
        </div>
    );
}
