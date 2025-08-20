
import { useUserContext } from "../../contexts/UserContext";
import { AddressInputEditAndUpdate } from "./AddressInputEditAndUpdate";
import { DeleteAddress } from "./DeleteAddress";
import { AddNewAddress } from "./AddNewAddress";


export function AddressManagementCard() {
    const {addresses} = useUserContext();
    return (
        <>
        <span className="fw-bold">Addresses: </span>
        <div className="ms-2">
            {Array.isArray(addresses) && addresses.map((element) => (
                
                <p className="row mb-1" key={element._id}>
                    <AddressInputEditAndUpdate element={element} />
                    <DeleteAddress elementId={element._id} />
                </p>
                
            ))}
        </div>
        <AddNewAddress />
        </>
    );
}