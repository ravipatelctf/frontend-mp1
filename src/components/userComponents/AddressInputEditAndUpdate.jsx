
import { useState } from "react";
import {toast} from "react-toastify";
import { updateAnAddress } from "../../data";
import { useUserContext } from "../../contexts/UserContext";

export function AddressInputEditAndUpdate({element}) {
    const {setUser, setAddresses} = useUserContext();
    const [addressInputs, setAddressInputs] = useState({});
    const [isEditMode, setIsEditMode] = useState({});

    function handleAddressInput(input, addressId) {
        setAddressInputs((preValues) => (
            {
                ...preValues,
                [addressId]: input,
            }
        ));
    }

    function handleIsEditMode(editModeValue, addressId) {
        setIsEditMode((preValues) => (
            {
                ...preValues,
                [addressId]: editModeValue,
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

    return (
        <>
        <input
            type="text" 
            value={addressInputs[element._id] ?? element.address} 
            className="w-50 mb-1 col-8 form-control me-1"
            onChange={(event) => {
                if (isEditMode[element._id]) {
                    handleAddressInput( event.target.value, element._id)
                } else {
                    toast.warn("Click Edit button to edit and update address.")
                }
            }}    
        />
        <button 
            className="col-2 btn btn-secondary btn-sm me-1 fw-bold" 
            onClick={() => {
                if (!isEditMode[element._id]) {
                    handleIsEditMode(true, element._id);
                } else {
                    handleAddressUpdate(element._id)
                    handleIsEditMode(false, element._id)
                }
            }}>
            {!isEditMode[element._id] ? "Edit" : "Update"}
        </button>
        </>
    );
}