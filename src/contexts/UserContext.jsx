import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../data";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);


export function UserProvider({children}) {
    const [user, setUser] = useState();
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);

    // -----------------------------------------------------------------------------------
    // fetch the user once when the component mounts
    useEffect(() => {

        async function fetchUser() {
            try {
                const data = await getUser();
                setUser(data);
                setAddresses(data.addresses);
                setOrders(data.orders);
            } catch (error) {
                throw error;
            }
        }

        fetchUser();
    }, []);

    if (!user) {
        return <p className="text-center">Loading...</p>
    }
    return (
        <UserContext.Provider value={{user, addresses, setUser, setAddresses, orders}} >
            {children}
        </UserContext.Provider>
    );
}