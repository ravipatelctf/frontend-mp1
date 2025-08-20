import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import { addNewAddress, deleteAnAddress, updateAnAddress } from "../data";

export default function UserProfile() {
    const [user, setUser] = useState();
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [orderStatus, setOrderStatus] = useState(false);
    const [addressInputs, setAddressInputs] = useState({});

    // -----------------------------------------------------------------------------------
    // fetch the user once when the component mounts
    useEffect(() => {

        async function fetchUser() {
            try {
                const response = await fetch(`https://backend-mp1.vercel.app/api/user`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
                setAddresses(data.addresses);
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
        if (!newAddress) {
            toast.error("Enter an address before submitting.");
            return;
        }
        const dataToUpdate = {"address": newAddress};
        const updateduser = await addNewAddress(dataToUpdate);

        if (updateduser) {
            toast.success("New address added successfully.");
            setUser(updateduser.user);
            setAddresses(updateduser.user.addresses)
        } else {
            toast.error("Failed to add new address!");
        }
         
        setNewAddress("")
    }

    // ------------------------------------------------------------------------------------------------

    async function handleDeleteAddress(addressId) {
        try {
            const updateddata = await deleteAnAddress(addressId);
            if (updateddata) {
                toast.success("Address deleted successfully.")
                setUser(updateddata.user);
                setAddresses(updateddata.user.addresses)
            }
        } catch (error) {
            toast.error("Failed to delete address!");
            throw new Error("Failed to delete an address!", error);
        }
    }

    // -------------------------------------------------------------------------------------------------

    function handleAddressInput(input, addressId) {
        setAddressInputs((preValues) => (
            {
                ...preValues,
                [addressId]: input,
            }
        ));
    }

    async function handleAddressUpdate(addressId) {
        try {
            const updatedAddress = { address: addressInputs[addressId] };
            const updatedData = await updateAnAddress(addressId, updatedAddress);
            if (updatedData) {
                toast.success("Address Updated successfully.")
                setUser(updatedData.user);
                setAddresses(updatedData.user.addresses);
            }
        } catch (error) {
            toast.error("Failed to update an address!");
            throw new Error("Failed to update an address!");
        }
    }

    // -------------------------------------------------------------------------------------------------

    if (!user) {
        return <p className="text-center">Loading...</p>
    }

    // -------------------------------------------------------------------------------------------------  
    return (
        <main className="container py-4">
            <div>
                <h3><span>Name: </span><span className="fw-bold">{user.name}</span></h3>
                
                <p><span className="fw-bold">Email-id: </span><span>{user.emailId}</span></p>
                <p><span className="fw-bold">Phone Number: </span><span>{user.phoneNumber}</span></p>
                <span className="fw-bold">Addresses: </span>
                <div className="ms-2">
                    {Array.isArray(addresses) && addresses.map((element) => (
                        
                        <p className="row mb-1" key={element.id}>
                            <input
                                key={element.id}
                                type="text" 
                                value={addressInputs[element._id] ?? element.address} 
                                className="w-50 mb-1 col-8 form-control me-1"
                                onChange={(event) => handleAddressInput( event.target.value, element._id)}
                                   
                            />
                            <button key={element.id} className="col-2 btn btn-secondary btn-sm me-1 fw-bold" onClick={() => handleAddressUpdate(element._id)}>Update</button>
                            <button key={element.id} className="col-2 btn btn-danger btn-sm fw-bold" onClick={() => handleDeleteAddress(element._id)}>Delete</button>
                        </p>
                        
                    ))}
                </div>
            </div>
            <form className="mb-2" onSubmit={handleAddNewAddress}>
                <label htmlFor="address" className="form-label fw-bold">Add New Address:</label>
                <textarea placeholder="Enter new address" value={newAddress} id="address" className="form-control mb-2" onChange={(event) => setNewAddress(event.target.value)}></textarea>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            
            <div className="mt-2">
                <button className="btn btn-info" onClick={() => {
                    !orderStatus && toast.info("Orders are visible now.")
                    orderStatus && toast.info("Orders are hidden now.")
                    setOrderStatus(!orderStatus)
                }}>
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


