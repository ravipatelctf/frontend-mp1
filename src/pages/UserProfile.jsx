import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [user, setUser] = useState();
    const [address, setAddress] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [orderStatus, setOrderStatus] = useState(false);
    
    // -----------------------------------------------------------------------------------

    // fetch the user once when the component mounts
    useEffect(() => {

        async function fetchUser() {
            try {
                const response = await fetch(`https://backend-mp1.vercel.app/api/user`);
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUser(data);
                setAddress(data.address);
                setOrders(data.orders);
            } catch (error) {
                throw error;
            }
        }

        fetchUser();
    }, []);

    // -----------------------------------------------------------------------------------
    
    async function handleAddNewAddress(event) {
        event.preventDefault()
        const updatedAddress = [...user.address, newAddress];

        const dataToUpdate = {address: updatedAddress};
        const updateduser = await updateUserAddress(dataToUpdate);

        if (updateduser) {
            setUser(updateduser);
            setAddress(updateduser.address)
        }

        setNewAddress("")
    }

    // -----------------------------------------------------------------------------------

    // API call for updating user address

    async function updateUserAddress(dataToUpdate) {
        try {
            const response = await fetch(`https://backend-mp1.vercel.app/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToUpdate)
            });

            if (!response.ok) {
                throw new Error("Failed to update user address.");
            }
            const updatedUserData = await response.json();
            return updatedUserData;
        } catch (error) {
            throw error;
        }
    }

    // -----------------------------------------------------------------------------------
    

    if (!user) {
        return <p>Loading...</p>
    }
    return (
        <main className="container py-4">
            <div>
                <h3><span>Name: </span><span className="fw-bold">{user.name}</span></h3>
                
                <p><span className="fw-bold">Email-id: </span><span>{user.emailId}</span></p>
                <p><span className="fw-bold">Phone Number: </span><span>{user.phoneNumber}</span></p>
                <p>
                    <span className="fw-bold">Address: </span>
                    <br />
                    {Array.isArray(address) && address.map(ua => (
                        <span key={ua}>{ua} <br /></span>
                    ))}
                </p>
            </div>
            <form className="mb-2" onSubmit={handleAddNewAddress}>
                <label htmlFor="address" className="form-label fw-bold">Add New Address:</label>
                <textarea placeholder="Enter new address" value={newAddress} id="address" className="form-control mb-2" onChange={(event) => setNewAddress(event.target.value)}></textarea>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            
            <div className="mt-2">
                <button className="btn btn-info" onClick={() => setOrderStatus(!orderStatus)}>
                    {orderStatus ? "Hide Order History" : "See Order History"}
                </button>
                
                <div className="row">
                    {orderStatus && Array.isArray(orders) && orders?.map(order => (
                        <ProductCard key={order._id} product={order} />
                    ))}
                </div>
            </div>
        </main>
    );
}

// ----------------------------------------------------------------------
// product card components

function ProductCard({product}) {   
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


