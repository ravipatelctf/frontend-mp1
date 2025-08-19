import {Link} from "react-router-dom";

function CardImage({productCategory}) {
    return (
        <div className="col-md-4">
            <Link to="/products" className="text-decoration-none">
            <div 
                className="card text-center text-dark d-flex align-items-center justify-content-center"
                style={{
                    height: "200px",
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1553591589-2e96ef7eca65?&w=200&h=100&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >   
                <p className="w-100 text-center fw-bold fs-4 bg-white bg-opacity-50 px-3 py-1">{productCategory}</p>
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
                    <CardImage productCategory="Men" />
                    <CardImage productCategory="Women" />
                    <CardImage productCategory="Kids" />
                </div>
                <div className="py-4">
                    <img 
                        src="https://placehold.co/1920x1080?text=Hero+Image" 
                        alt="Hero Image"
                        className="img-fluid"
                    />
                </div>
                <div className="row">
                    <div className="py-4 col-md-6">
                        <Link to="/products" className="text-decoration-none">
                        <div className="card flex-row">
                            <img 
                                src="https://placehold.co/200x200?text=Winter+Collection" 
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
                                src="https://placehold.co/200x200?text=Summer+Collection" 
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
