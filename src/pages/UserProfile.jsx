
import { UserProvider } from "../contexts/UserContext";
import {UserInfoCard} from "../components/userComponents/UserInfoCard";
import { OrdersHistoryManagementCard } from "../components/userComponents/OrdersHistoryManagementCard";

export default function UserProfile() {
    return (
        <UserProvider>
            <main className="container py-4">
                <UserInfoCard />            
                <OrdersHistoryManagementCard />
            </main>
        </UserProvider>
    );
}
