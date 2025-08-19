import {Link} from "react-router-dom";

function CardImage({productCategory, imgUrl}) {
    return (
        <div className="col-md-4">
            <Link to="/products" className="text-decoration-none">
            <div 
                className="card text-center border text-dark d-flex align-items-center justify-content-center"
                style={{
                    height: "200px",
                    backgroundImage:
                        `url(${imgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >   
                <p className="w-100 text-center fw-bold fs-4 bg-light px-3 py-1">{productCategory}</p>
            </div>
            </Link>
        </div>
    );
}


export default function Home() {
    return (
        <>
            <main className="container py-4">
                <div className="row">
                    <CardImage productCategory="Men" imgUrl="https://images.unsplash.com/photo-1625910513520-bed0389ce32f?&w=200&h=100&fit=crop" />
                    <CardImage productCategory="Women" imgUrl="https://images.unsplash.com/photo-1712160059102-19368c085984?&w=200&h=100&fit=crop" />
                    <CardImage productCategory="Kids" imgUrl="https://images.unsplash.com/photo-1739047596014-d921ce553f1c?&w=200&h=100&fit=crop" />
                </div>
                <div className="py-4">
                    <img 
                        src={`https://plus.unsplash.com/premium_photo-1664474612991-2147a048883a`} 
                        alt="Hero Image"
                        className="img-fluid"
                    />
                </div>
                <div className="row">
                    <div className="py-4 col-md-6">
                        <Link to="/products" className="text-decoration-none">
                        <div className="card flex-row">
                            <img 
                                src={`https://images.unsplash.com/photo-1609175086681-28a822dfd86b?w=200&h=200&fit=crop`} 
                                alt="Hero Image"
                                className="img-fluid"
                            />
                            <div className="card-body">
                                <p>New Arrivals</p>
                                <h5>Winter Collection</h5>
                                <p>Check out our best winter collection to stay warm in style this season</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="py-4 col-md-6">
                        <Link to="/products" className="text-decoration-none">
                        <div className="card flex-row">
                            <img 
                                src={`https://images.unsplash.com/photo-1542060748-10c28b62716f?w=200&h=200&fit=crop`} 
                                alt="Hero Image"
                                className="img-fluid"
                            />
                            <div className="card-body">
                                <p>New Arrivals</p>
                                <h5>Summer Collection</h5>
                                <p>Check out our best summer collection to stay cool in this skin burning season</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
