
// deployed api => https://backend-mp1.vercel.app/api/products
// localhost api => http://localhost:3000/api/products

async function fetchData() {
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

export const productsData = await fetchData();