
import { useState } from "react";
import {toast} from "react-toastify";
import { addNewAddress } from "../../data";
import { useUserContext } from "../../contexts/UserContext";


export function AddNewAddress() {
    const {setUser, setAddresses} = useUserContext();
    const [newAddress, setNewAddress] = useState("");

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
    return (
        <>
        <form className="mb-2" onSubmit={handleAddNewAddress}>
            <label htmlFor="address" className="form-label fw-bold">Add New Address:</label>
            <textarea placeholder="Enter new address" value={newAddress} id="address" className="form-control mb-2" onChange={(event) => setNewAddress(event.target.value)}></textarea>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    );
}