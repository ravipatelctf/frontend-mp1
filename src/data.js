
// deployed api => https://backend-mp1.vercel.app/api/products
// localhost api => http://localhost:3000/api/products

// ------------------------------------------------------------------------------------------------

export async function getData() {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/products`, {method: "GET"});

        if (!response.ok) {
            console.log("Failed to fetch data")
        }
        const data = await response.json();        
        return data;
    } catch (error) {
        console.log("Failed to fetch data") 
    } 
}
export const data = await getData();

// ------------------------------------------------------------------------------------------------
export async function updateData(productId, isAddedToCartValue) {
    try {
        const response = await fetch(`https://backend-mp1.vercel.app/api/products/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isAddedToCart: isAddedToCartValue})
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