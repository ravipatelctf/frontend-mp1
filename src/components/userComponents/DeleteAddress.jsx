
import {toast} from "react-toastify";
import { deleteAnAddress } from "../../data";
import { useUserContext } from "../../contexts/UserContext";

export function DeleteAddress({elementId}) {
    const {setUser, setAddresses} = useUserContext();
    async function handleDeleteAddress(elementId) {
        try {
            const updateddata = await deleteAnAddress(elementId);
            if (updateddata) {
                setUser(updateddata.user);
                setAddresses(updateddata.user.addresses)
                toast.success("Address deleted successfully.")
            }
        } catch (error) {
            toast.error("Failed to delete address!");
            throw new Error("Failed to delete an address!", error);
        }
    }
    return (
        <button className="col-2 btn btn-danger btn-sm fw-bold" onClick={() => handleDeleteAddress(elementId)}>Delete</button>
    );
}