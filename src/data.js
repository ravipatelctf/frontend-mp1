
// deployed api baseUrl => https://backend-mp1.vercel.app/api/products
// localhost api baseUrl => http://localhost:3000/api/products

// ------------------------------------------------------------------------------------------------

export async function getData() {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/products`, {method: "GET"});

        if (!response.ok) {
            throw new Error("Failed to fetch data")
        }

        const data = await response.json();      
        return data;
    } catch (error) {
        throw error;
    } 
}

// ------------------------------------------------------------------------------------------------
export async function updateData(productId, dataToUpdate) {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/products/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToUpdate)
        });

        if (!response.ok) {
            console.log("Failed to fetch data")
        }
        const {updatedData} = await response.json();
        
        return updatedData;

        } catch (error) {
            throw error 
        } 
    }

// ------------------------------------------------------------------------------------------------

export async function getUser() {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/user`);
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ------------------------------------------------------------------------------------------------

export async function addNewAddress(dataToUpdate) {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/user/addresses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToUpdate)
        });

        if (!response.ok) {
            console.log("Failed to fetch data")
        }
        const updatedData = await response.json();
        
        return updatedData;

    } catch (error) {
            throw error 
    } 
}

// ------------------------------------------------------------------------------------------------

export async function deleteAnAddress(addressId) {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/user/addresses/${addressId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.log("Failed to fetch data")
        }
        const updatedData = await response.json();
        
        return updatedData;

    } catch (error) {
            throw error 
    } 
}

// ------------------------------------------------------------------------------------------------

export async function updateAnAddress(addressId, updatedAddress) {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/user/addresses/${addressId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAddress)
        });

        if (!response.ok) {
            console.log("Failed to fetch data")
        }
        const updatedData = await response.json();
        
        return updatedData;

    } catch (error) {
            throw error 
    } 
}

// ------------------------------------------------------------------------------------------

export async function createNewOrder(dataToUpdate) {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/orders`, {
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