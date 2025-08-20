import { createContext, useContext, useState, useEffect } from "react";


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

    if (!user) {
        return <p className="text-center">Loading...</p>
    }
    return (
        <UserContext.Provider value={{user, addresses, setUser, setAddresses, orders}} >
            {children}
        </UserContext.Provider>
    );
}