
import { useUserContext } from "../../contexts/UserContext";
import { AddressManagementCard } from "./AddressManagementCard";

export function UserInfoCard() {
    const {user} = useUserContext();
    return (
        <>
        <h3><span>Name: </span><span className="fw-bold">{user.name}</span></h3>
        <p><span className="fw-bold">Email-id: </span><span>{user.emailId}</span></p>
        <p><span className="fw-bold">Phone Number: </span><span>{user.phoneNumber}</span></p>
        <AddressManagementCard />
        </>
    );
}